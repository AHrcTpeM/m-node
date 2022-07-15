let Validator = {

    validateEmail: (str) => {
        let regexp = /^[a-z][a-z0-9-+.]{1,20}@[\w.!$%&'*+/=?^-]{1,15}\.[a-z]{1,5}$/i;
        return regexp.test(str);
    },

    validatePhone: (str) => {
        let regexp = /^(?=.{10,25}$)[\s-]*(\+38)?[\s-]*(\((\d[\s-]*){3}\)|(\d[\s-]*){3})([\s-]*\d){7}$/i;
        return regexp.test(str);
    },

    validatePassword: (str) => {
        let regexp = /^(?=.*[A-Z])^(?=.*[a-z])^(?=.*[\d])\w{8,}$/;
        return regexp.test(str);
    },
}

function test(testStr, validateFunction) {
    for (let str of testStr) {
        console.log(`Test ${testStr.indexOf(str) + 1} -`, validateFunction(str), `- ${str}`);
    }
}

let testEmail = ["fi@secondpart.end", "first-part@.se=cond%p.art.end", "first.part@se=cond%part.r", "f@secondart.end", "first-part@.se=cond@part.end", "-firstpart@.se=cond%.enddeded", "firs_tpart@.se.en", "firstpart@.se.enddeded"];

let testPhone = ["  0995678901", "+38 (099) 567 8901", "+38 099 5 6 7 8 9  01", "(09-9) 567-890-1", "--  (099) 567 890-1", "+38 (099) 567 8901 0", "+38 099 a0000000", "+38 (0989) 567 8901", "+48 (0989) 567 8901"];

let testPassword = ["C00l_Pass", "SupperPas1", "Cool_pass", "C00l"];

test(testEmail, Validator.validateEmail);
console.log();
test(testPhone, Validator.validatePhone);
console.log();
test(testPassword, Validator.validatePassword);