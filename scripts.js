document.addEventListener('DOMContentLoaded', () => {
    // Função para carregar o perfil ao abrir a página
    function loadProfile() {
        const email = localStorage.getItem('currentUser');
        if (!email) {
            return; // Não faz nada se não houver usuário logado
        }

        const cadastros = JSON.parse(localStorage.getItem('cadastros') || '[]');
        const usuario = cadastros.find(cadastro => cadastro.username === email);

        if (usuario) {
            const profileName = document.getElementById('profile-name');
            const profileEmail = document.getElementById('profile-email');
            const nomeInput = document.getElementById('nome');
            const idadeInput = document.getElementById('idade');
            const cidadeInput = document.getElementById('cidade');

            if (profileName) profileName.textContent = usuario.nome;
            if (profileEmail) profileEmail.textContent = usuario.username;
            if (nomeInput) nomeInput.value = usuario.nome;
            if (idadeInput) idadeInput.value = usuario.idade || '';
            if (cidadeInput) cidadeInput.value = usuario.cidade || '';
        }
    }

    // Função para atualizar o perfil
    function handleProfileUpdate(event) {
        event.preventDefault();

        const email = localStorage.getItem('currentUser');
        if (!email) {
            return false;
        }

        const nome = document.getElementById('nome').value.trim();
        const idade = document.getElementById('idade').value.trim();
        const cidade = document.getElementById('cidade').value.trim();
        const messageElement = document.getElementById('message');

        if (!nome || !idade || !cidade) {
            messageElement.textContent = "Por favor, preencha todos os campos.";
            messageElement.style.color = "red";
            return false;
        }

        let cadastros = JSON.parse(localStorage.getItem('cadastros') || '[]');
        const usuarioIndex = cadastros.findIndex(cadastro => cadastro.username === email);

        if (usuarioIndex !== -1) {
            cadastros[usuarioIndex] = { ...cadastros[usuarioIndex], nome, idade, cidade };
            localStorage.setItem('cadastros', JSON.stringify(cadastros));
            messageElement.textContent = "Perfil atualizado com sucesso.";
            messageElement.style.color = "green";
        }

        return false;
    }

    // Função para lidar com o login
    function handleLogin(event) {
        event.preventDefault();

        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value.trim();
        const messageElement = document.getElementById('message');

        if (!username || !password) {
            messageElement.textContent = "Por favor, preencha todos os campos.";
            messageElement.style.color = "red";
            return false;
        }

        const cadastros = JSON.parse(localStorage.getItem('cadastros') || '[]');

        const usuarioExistente = cadastros.find(cadastro => cadastro.username === username && cadastro.password === password);

        if (!usuarioExistente) {
            messageElement.textContent = "Conta não encontrada ou senha incorreta.";
            messageElement.style.color = "red";
            return false;
        }

        localStorage.setItem('currentUser', username); // Armazena o usuário logado
        messageElement.textContent = "Login bem-sucedido.";
        messageElement.style.color = "green";

        window.location.href = '/perfil.html'; // Redireciona para a página de perfil

        return false;
    }

    // Função para lidar com o cadastro
    function handleCadastro(event) {
        event.preventDefault();

        const nome = document.getElementById('nome').value.trim();
        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value.trim();
        const messageElement = document.getElementById('message');

        if (!nome || !username || !password) {
            messageElement.textContent = "Por favor, preencha todos os campos.";
            messageElement.style.color = "red";
            return false;
        }

        const cadastros = JSON.parse(localStorage.getItem('cadastros') || '[]');

        const usuarioExistente = cadastros.find(cadastro => cadastro.username === username);

        if (usuarioExistente) {
            messageElement.textContent = "Conta já existe.";
            messageElement.style.color = "red";
            return false;
        }

        const novoCadastro = { nome, username, password };
        cadastros.push(novoCadastro);
        localStorage.setItem('cadastros', JSON.stringify(cadastros));
        localStorage.setItem('currentUser', username); // Armazena o usuário logado

        messageElement.textContent = "Conta criada com sucesso.";
        messageElement.style.color = "green";

        window.location.href = '/perfil.html'; // Redireciona para a página de perfil

        return false;
    }

    window.handleCadastro = handleCadastro;
    window.handleLogin = handleLogin;
    window.handleProfileUpdate = handleProfileUpdate;

    // Carrega o perfil quando a página é carregada, mas somente se estamos na página de perfil
    if (document.body.classList.contains('perfil')) {
        loadProfile();
    }
});