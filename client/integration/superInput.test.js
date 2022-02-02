describe('SuperInput', () => {
    it('base example, visually looks correct', async () => {
        await page.goto('http://localhost:9009/iframe.html?id=todolist-textinput--default-input-story&viewMode=story');
        const image = await page.screenshot();
        expect(image).toMatchImageSnapshot();
    });
});

