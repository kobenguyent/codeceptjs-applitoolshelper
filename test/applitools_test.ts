const { I } = inject();

Feature('Applitools - Visual Check');

Scenario('Check home page @test', async () => {
    I.amOnPage('https://applitools.com/helloworld');
    I.eyeCheck({ pageName: 'Homepage' });

    I.amOnPage('https://www.google.com');
    await tryTo(() => I.eyeCheck({ pageName: 'Homepage' }));
});
