// Objeto para validação de CPF

const validCPF = {
    
    isValid: function (cpf) { // retorna valor boolean para representar a validação do cpf
        const clearCpf = this.clearCpf(cpf);
        let cpfArray = this.cpfCut(clearCpf);

        if (clearCpf.length !== 11) return false;

        const firstNumberValid = this.numberValidation(cpfArray);
        cpfArray = this.cpfConcat(cpfArray, firstNumberValid);
        const secondNumberValidation = this.numberValidation(cpfArray);
        cpfArray = this.cpfConcat(cpfArray, secondNumberValidation);

        return this.toCompare(clearCpf, cpfArray);
    },

    clearCpf: function (cpf) { // retorna o cpf pontos ('.') e traços ('-')
        return cpf.replace(/\D+/g, '');
    },

    cpfCut: function (cpfClear) { // converte em Array e corta os numeros de validação
        return Array.from(cpfClear.slice(0, 9));
    },

    numberValidation: function (cpfArray) { // faz o calculo e retorna o digito de validação do array
        const calc = cpfArray.reduce((ac, valor, ind) => {
            return ac + Number(valor * ((cpfArray.length + 1) - ind));
        }, 0);

        const calcNumber = 11 - (calc % 11);
        if (calcNumber > 9) return 0;
        return calcNumber;
    },
    
    cpfConcat: function (cpfArray, number) { // excuta push do numero de validação
        cpfArray.push(String(number));
        return cpfArray;
    },

    toCompare: function (arrayOriginal, arrayValid) { // compara o array original com o valido
        for (let i = 0; i < arrayOriginal.length; i++) {
            if (arrayOriginal[i] !== arrayValid[i]) {
                return false;
            }
        }
        return true;
    }
};


console.log(validCPF.isValid("101.288.130-08")); // verificando se é um cpf valido