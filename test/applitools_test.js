const { I } = inject();

Feature('Applitools - Visual Check');

Scenario('Check home page @test', async () => {
    I.amOnPage('https://applitools.com/helloworld');
    await I.eyeCheck({ pageName: 'Homepage' });
});
