/**
 * These browser checks preserve the UI fixes identified during the first cloudservs learning
 * chunk. The assertions focus on behavior and geometry instead of fragile screenshot pixels.
 */
import { expect, test, type Locator } from '@playwright/test';

/** A compact geometry record makes alignment assertions readable. */
interface Box {
  top: number;
  right: number;
  bottom: number;
  left: number;
  width: number;
  height: number;
}

/** Read rendered rectangles because CSS declarations alone cannot prove visible alignment. */
async function readBoxes(locator: Locator): Promise<Box[]> {
  return locator.evaluateAll((elements) =>
    elements.map((element) => {
      const rectangle = element.getBoundingClientRect();
      return {
        top: rectangle.top,
        right: rectangle.right,
        bottom: rectangle.bottom,
        left: rectangle.left,
        width: rectangle.width,
        height: rectangle.height,
      };
    }),
  );
}

/** Compare measurements with a one-pixel tolerance for browser subpixel layout. */
function expectAligned(values: number[], tolerance = 1): void {
  expect(Math.max(...values) - Math.min(...values)).toBeLessThanOrEqual(tolerance);
}

/** Inspect Mermaid geometry directly so every tested label remains inside its rendered node. */
async function readOverflowingMermaidNodes(diagram: Locator): Promise<string[]> {
  return diagram.locator('.mermaid .node').evaluateAll((nodes) =>
    nodes.flatMap((node, index) => {
      const label = node.querySelector<HTMLElement>('.nodeLabel');
      const shape = node.querySelector<SVGGraphicsElement>('rect, polygon, path');
      if (!label || !shape) return [`node ${index} is missing a label or shape`];

      const labelBox = label.getBoundingClientRect();
      const shapeBox = shape.getBoundingClientRect();
      const tolerance = 2;
      const contained =
        labelBox.left >= shapeBox.left - tolerance &&
        labelBox.right <= shapeBox.right + tolerance &&
        labelBox.top >= shapeBox.top - tolerance &&
        labelBox.bottom <= shapeBox.bottom + tolerance;

      return contained ? [] : [`node ${index} label exceeds its shape`];
    }),
  );
}

test.describe('shared visual regressions', () => {
  test('learner pages make no requests to third-party origins', async ({ page }) => {
    /** Static same-origin assets are expected, while any different origin is a privacy regression. */
    const thirdPartyRequests: string[] = [];
    page.on('request', (request) => {
      const requestedUrl = new URL(request.url());
      if (
        requestedUrl.protocol.startsWith('http') &&
        requestedUrl.origin !== 'http://127.0.0.1:4330'
      ) {
        thirdPartyRequests.push(request.url());
      }
    });

    /** Visit representative pages that exercise the homepage, search shell, and rich diagrams. */
    for (const path of [
      './',
      './learn/how-to-use-cloudservs/',
      './learn/foundations/what-is-cloud-computing/',
    ]) {
      await page.goto(path);
      await page.waitForLoadState('networkidle');
    }

    expect(thirdPartyRequests).toEqual([]);
  });

  test('learning toolkit remains a three-by-two grid with six equal cards', async ({ page }) => {
    await page.goto('./');

    const cards = page.locator('.learning-card');
    await expect(cards).toHaveCount(6);

    const boxes = await readBoxes(cards);
    expectAligned(boxes.map((box) => box.height));
    expectAligned(boxes.map((box) => box.width));

    const rowTops = [...new Set(boxes.map((box) => Math.round(box.top)))];
    expect(rowTops).toHaveLength(2);
    expect(rowTops.map((top) => boxes.filter((box) => Math.round(box.top) === top).length)).toEqual(
      [3, 3],
    );
  });

  test('AWS, Azure, and Google Cloud cards keep identical outer geometry', async ({ page }) => {
    await page.goto('./learn/foundations/what-is-cloud-computing/');

    const cards = page.locator('.provider-card');
    await expect(cards).toHaveCount(3);

    const boxes = await readBoxes(cards);
    expectAligned(boxes.map((box) => box.top));
    expectAligned(boxes.map((box) => box.bottom));
    expectAligned(boxes.map((box) => box.width));
    expectAligned(boxes.map((box) => box.height));
  });

  test('diagram controls share one baseline and use centered SVG zoom icons', async ({ page }) => {
    await page.goto('./learn/curriculum-roadmap/');

    const toolbar = page.getByRole('group', { name: 'Diagram viewing controls' });
    const controls = toolbar.locator(':scope > button, :scope > output');
    await expect(controls).toHaveCount(5);

    const boxes = await readBoxes(controls);
    expectAligned(
      boxes.map((box) => box.top),
      0.5,
    );
    expectAligned(
      boxes.map((box) => box.height),
      0.5,
    );
    await expect(toolbar.locator('svg.diagram-toolbar__icon')).toHaveCount(2);

    await toolbar.getByRole('button', { name: 'Zoom in' }).click();
    await expect(toolbar.getByRole('status')).toHaveText('125%');
    await toolbar.getByRole('button', { name: 'Zoom out' }).click();
    await expect(toolbar.getByRole('status')).toHaveText('100%');
  });

  test('Mermaid labels remain inside nodes at maximum zoom', async ({ page }) => {
    await page.goto('./learn/how-to-use-cloudservs/');

    const diagram = page.getByRole('figure', { name: 'The structure of a complete lesson' });
    const zoomIn = diagram.getByRole('button', { name: 'Zoom in' });

    for (let click = 0; click < 8; click += 1) await zoomIn.click();
    await expect(diagram.getByRole('status')).toHaveText('300%');

    expect(await readOverflowingMermaidNodes(diagram)).toEqual([]);
  });

  test('starter architecture labels remain contained through maximum zoom', async ({ page }) => {
    await page.goto('./learn/foundations/what-is-cloud-computing/');

    const diagram = page.getByRole('figure', { name: 'A small web application in the cloud' });
    const zoomIn = diagram.getByRole('button', { name: 'Zoom in' });

    for (let click = 0; click < 8; click += 1) await zoomIn.click();
    await expect(diagram.getByRole('status')).toHaveText('300%');
    expect(await readOverflowingMermaidNodes(diagram)).toEqual([]);
  });

  test('flashcards stack on mobile and reveal answers from the keyboard in dark mode', async ({
    page,
  }) => {
    /** Set the theme before navigation so the first rendered frame follows the dark palette. */
    await page.addInitScript(() => localStorage.setItem('starlight-theme', 'dark'));
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('./learn/foundations/what-is-cloud-computing/#flashcards');

    const cards = page.locator('.flashcard');
    await expect(cards).toHaveCount(6);
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');

    /** One aligned column prevents narrow cards from competing for horizontal reading space. */
    const boxes = await readBoxes(cards);
    expectAligned(boxes.map((box) => box.left));
    expectAligned(boxes.map((box) => box.right));

    /** Native summary activation must expose the answer without a pointer or client script. */
    const firstCard = cards.first();
    const firstPrompt = firstCard.locator('summary');
    await firstPrompt.focus();
    await firstPrompt.press('Enter');
    await expect(firstCard).toHaveJSProperty('open', true);
    /**
     * MDX can preserve surrounding whitespace as empty paragraphs in the generated HTML. Filter by
     * the expected answer text so Playwright checks the one learner-visible answer instead of
     * requiring every paragraph descendant to be a single strict-mode match.
     */
    const firstAnswer = firstCard.locator('p').filter({ hasText: 'On-demand self-service' });
    await expect(firstAnswer).toHaveCount(1);
    await expect(firstAnswer).toBeVisible();
  });

  test('ASCII diagrams stay centered and copy reliably', async ({ context, page }) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write'], {
      origin: 'http://127.0.0.1:4330',
    });
    await page.goto('./');

    const diagram = page.getByRole('figure', { name: 'The cloudservs learning loop' });
    const body = diagram.locator('.diagram-card__body');
    const drawing = diagram.locator('pre');
    const [bodyBox, drawingBox] = await Promise.all([body.boundingBox(), drawing.boundingBox()]);
    expect(bodyBox).not.toBeNull();
    expect(drawingBox).not.toBeNull();

    const bodyCenter = bodyBox!.x + bodyBox!.width / 2;
    const drawingCenter = drawingBox!.x + drawingBox!.width / 2;
    expect(Math.abs(bodyCenter - drawingCenter)).toBeLessThanOrEqual(1);

    const copyButton = diagram.getByRole('button', { name: 'Copy The cloudservs learning loop' });
    await copyButton.click();
    await expect(copyButton).toHaveText('Copied');
    await expect
      .poll(() => page.evaluate(() => navigator.clipboard.readText()))
      .toContain('Concept');

    await page.goto('./learn/foundations/what-is-cloud-computing/');
    const analogyCopy = page.getByRole('button', {
      name: 'Copy Utility analogy for cloud computing',
    });
    await analogyCopy.click();
    await expect(analogyCopy).toHaveText('Copied');
    await expect
      .poll(() => page.evaluate(() => navigator.clipboard.readText()))
      .toContain('Electricity utility');
  });

  test('heading chain links navigate and copy complete section URLs', async ({ context, page }) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write'], {
      origin: 'http://127.0.0.1:4330',
    });
    await page.goto('./learn/foundations/what-is-cloud-computing/');

    const sectionLink = page.locator('.sl-anchor-link[href="#5-measured-service"]');
    await sectionLink.click();

    const expectedUrl =
      'http://127.0.0.1:4330/cloudservs/learn/foundations/what-is-cloud-computing/#5-measured-service';
    await expect(page).toHaveURL(expectedUrl);
    await expect.poll(() => page.evaluate(() => navigator.clipboard.readText())).toBe(expectedUrl);
    await expect(page.locator('[data-section-link-status]')).toHaveText(
      'Copied link to 5. Measured service',
    );
    await expect(sectionLink).toHaveAttribute('data-copy-state', 'copied');
  });

  test('contents pane moves, resizes, and restores its saved layout', async ({ page }) => {
    await page.goto('./learn/foundations/what-is-cloud-computing/');

    const layout = page.locator('[data-resizable-toc]');
    const moveLeft = page.getByRole('button', { name: 'Move contents pane to the left' });
    const moveRight = page.getByRole('button', { name: 'Move contents pane to the right' });
    const separator = page.getByRole('separator', { name: 'Resize contents pane' });

    await moveLeft.click();
    await expect(layout).toHaveAttribute('data-toc-side', 'left');
    await expect(moveLeft).toHaveAttribute('aria-pressed', 'true');

    await separator.focus();
    await separator.press('ArrowRight');
    await expect(separator).toHaveAttribute('aria-valuenow', '304');

    await moveRight.click();
    await expect(layout).toHaveAttribute('data-toc-side', 'right');
    await page.reload();
    await expect(layout).toHaveAttribute('data-toc-side', 'right');
    await expect(separator).toHaveAttribute('aria-valuenow', '304');
  });

  test('Markmap labels retain readable dark-mode contrast', async ({ page }) => {
    await page.addInitScript(() => localStorage.setItem('starlight-theme', 'dark'));
    await page.goto('./learn/curriculum-roadmap/');

    const map = page.locator('svg.markmap');
    await expect(map).toHaveAttribute('data-ready', 'true');
    await expect(map).toHaveCSS('--markmap-text-color', '#f8fafc');

    const firstLabel = map.locator('foreignObject div').first();
    await expect(firstLabel).toBeVisible();
    await expect(firstLabel).toHaveCSS('color', 'rgb(248, 250, 252)');
  });
});
