export default  class Form {
    constructor(selector) {
        try{
            this.form = document.querySelector(selector);
            this.inputs = this.form.querySelectorAll('input');
            this.overlay = document.querySelector('.overlay');
        }catch(e){}
    }

    setRequiredFields() {
        this.inputs.forEach(input => {
            input.setAttribute('required', '');
        });
    }

    sendForm() {
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            let statusMessage = {
                loading: 'loading is in progress',
                success: 'your data transfer is success',
                fail: 'Something going wrong'
            };
            let div = document.createElement('div');
            div.style.cssText = `
                color: red;
                font-size: 20px;
                text-align: center;
                width: 400px;
                height: 250px;
                background-color: #fff;
                position: absolute;
                padding-top: 100px;
                top: 200px;
                left: 700px;

            `;
            this.overlay.append(div);
            div.textContent = statusMessage.loading;
            this.overlay.style.display = 'block';
            let formData = new FormData(this.form);
            this.postData('./assets/question.php', formData)
                .then(data => console.log(data))
                .then(() => {
                    div.textContent = statusMessage.success;
                })
                .catch(() => {
                    div.textContent = statusMessage.fail;
                })
                .finally(() => {
                    this.form.reset();
                    setTimeout(() => {
                        div.remove();
                        this.overlay.style.display = 'none';
                    }, 3000);
                });
            
        });
    }

    async postData(url, data) {
        const res = await fetch(url, {
            method: 'POST',
            body: data
        });
        return await res.text();
    }

    checkCyrillic() {
        this.inputs.forEach(input => {
            if(input.getAttribute('name') === 'email') {
                input.addEventListener('input', () => {
                    input.value = input.value.replace(/[^A-Za-z@ \.]/g, '');
                });
            }
        });
    }

    mask(selector) {
        // let setCursorPosition = (pos, elem) => {
        //     elem.focus();
        //     if(elem.setSelectionRange) {
        //         elem.setSelectionRange(pos, pos);
        //     }else if(elem.createTextRange) {
        //         let range = elem.createTextRange();
        //         range.collapse();
        //         range.moveEnd('character', pos);
        //         range.moveStart('character', pos);
        //         range.select();
        //     }
        // };
        function createMask(event) {
            let matrix = '+1 (___) ___-____',
                i = 0,
                def = matrix.replace(/\D/g, ''),
                val = this.value.replace(/\D/g, '');
            if(def.length >= val.length) {
                val = def;
            }
            this.value = matrix.replace(/./g, function(a) {
                return /[_\d]/.test(a) && i < val.length ? val.charAt(i++): i >= val.length ? '': a;
            });
            // if(event.type === 'blur') {
            //     if(this.value.length == 2) {
            //         this.value = '';
            //     }else {
            //         setCursorPosition(this.value.length, this);
            //     }
            // }
        }
        let input = document.querySelector(selector);
        input.addEventListener('input', createMask);
        input.addEventListener('focus', createMask);
        // input.addEventListener('blur', createMask);

    }

    init() {
        try{
            this.setRequiredFields();
            this.sendForm();
            this.checkCyrillic();
            this.mask('[name=phone]');
        }catch(e){}
    }


}