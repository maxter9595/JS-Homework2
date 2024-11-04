document.addEventListener("DOMContentLoaded", () => {
    const tabsContainer = document.querySelectorAll('.tabs');

    tabsContainer.forEach(tabs => {
        const tabsNav = tabs.querySelector('.tab__navigation');
        const tabsContent = tabs.querySelectorAll('.tab__content');
        const tabsItems = tabsNav.querySelectorAll('.tab');

        tabsItems.forEach((tab, index) => {
            tab.addEventListener('click', () => {
                tabsItems.forEach(item => item.classList.remove('tab_active'));
                tabsContent.forEach(content => content.classList.remove('tab__content_active'));

                tab.classList.add('tab_active');
                tabsContent[index].classList.add('tab__content_active');
            });
        });
    });
});