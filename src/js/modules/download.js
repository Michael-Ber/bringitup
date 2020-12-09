export default class Download {
    constructor(selector) {
        this.elem = document.querySelectorAll(selector);
        this.path = 'assets/img/Bitmap.jpg';
    }

    downloadFile(path) { // данный метод создает виртуальную ссылку, которая позволяет
        const link = document.createElement('a'); // скачать файл. Этот метод используется
        link.href = path; // потому, что скачать можно только файл с тегом <a href="путь к файлу" download></a> 
        link.setAttribute('download', 'nice'); // и атрибутом download. Мы делаем принудительный 
        link.style.display = 'none'; // клик (link.click()) и затем удаляем элемент со страницы 
        document.body.appendChild(link); // по сути кликая в методе init() мы вызываем link.click()
        link.click();
        document.body.removeChild(link);
    }

    init() {
        this.elem.forEach(elem => {
            elem.addEventListener('click', (e) => {
                e.stopPropagation();
                this.downloadFile(this.path);
            });
        });
    }
}