const getIndexPage = (req, res) => {

    res.render('index');
};

const getRegisterPage = (req, res) => {
    res.render('register');
};

const getLoginPage = (req, res) => {
    res.render('login');
};


export {getIndexPage, getRegisterPage, getLoginPage};