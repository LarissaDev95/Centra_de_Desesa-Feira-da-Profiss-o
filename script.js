// ==========================================
// CENTRAL DE DEFESA
// Sistema de demonstração para feira
// ==========================================


// CONTADORES

let threats = 0;
let logins = 0;
let suspiciousIPs = 0;


// ELEMENTOS

const threatCount = document.getElementById("threatCount");
const loginCount = document.getElementById("loginCount");
const ipCount = document.getElementById("ipCount");

const logTable = document.getElementById("logTable");
const alertsList = document.getElementById("alertsList");

const simulateButton =
    document.getElementById("simulateAttack");

const attackStatus =
    document.getElementById("attackStatus");


// ==========================================
// IPs SIMULADOS
// ==========================================

const ips = [
    "192.168.1.45",
    "185.199.110.23",
    "10.0.0.12",
    "172.16.0.5",
    "203.0.113.15"
];


// ==========================================
// TIPOS DE ATAQUE
// ==========================================

const attacks = [

    {
        type: "Tentativa de login",
        description: "Usuário admin (falhou)",
        status: "FALHA",
        class: "blocked"
    },

    {
        type: "IP suspeito",
        description: "Conexão de local incomum",
        status: "ALERTA",
        class: "alert"
    },

    {
        type: "SQL Injection",
        description: "Payload suspeito detectado",
        status: "BLOQUEADO",
        class: "blocked"
    },

    {
        type: "Acesso não autorizado",
        description: "Tentativa de acesso à área restrita",
        status: "BLOQUEADO",
        class: "blocked"
    },

    {
        type: "Varredura de portas",
        description: "Portas 22, 80 e 443",
        status: "ALERTA",
        class: "alert"
    }

];


// ==========================================
// DATA / HORA
// ==========================================

function updateDateTime() {

    const now = new Date();

    const date =
        now.toLocaleDateString("pt-BR");

    const time =
        now.toLocaleTimeString("pt-BR");

    document.getElementById("dateTime").textContent =
        `${date} ${time}`;
}

setInterval(updateDateTime, 1000);

updateDateTime();


// ==========================================
// ADICIONAR LOG
// ==========================================

function addLog(attack) {

    const now = new Date();

    const time =
        now.toLocaleTimeString("pt-BR");

    const ip =
        ips[Math.floor(Math.random() * ips.length)];


    const row =
        document.createElement("tr");


    row.innerHTML = `

        <td>${time}</td>

        <td>${attack.type}</td>

        <td>${attack.description}</td>

        <td>${ip}</td>

        <td>

            <span class="status ${attack.class}">
                ${attack.status}
            </span>

        </td>

    `;


    logTable.prepend(row);


    // Limitar quantidade de logs

    if (logTable.children.length > 8) {

        logTable.removeChild(
            logTable.lastElementChild
        );

    }

}


// ==========================================
// ADICIONAR ALERTA
// ==========================================

function addAlert(attack) {

    const ip =
        ips[Math.floor(Math.random() * ips.length)];


    const now = new Date();

    const time =
        now.toLocaleTimeString("pt-BR", {
            hour: "2-digit",
            minute: "2-digit"
        });


    let color = "red";


    if (attack.class === "alert") {
        color = "yellow";
    }


    const alert =
        document.createElement("div");


    alert.className = "alert-item";


    alert.innerHTML = `

        <span class="alert-icon ${color}">
        </span>

        <div>

            <strong>
                ${attack.type}
            </strong>

            <small>
                IP: ${ip}
            </small>

        </div>

        <small style="margin-left:auto">
            ${time}
        </small>

    `;


    alertsList.prepend(alert);


    if (alertsList.children.length > 5) {

        alertsList.removeChild(
            alertsList.lastElementChild
        );

    }

}


// ==========================================
// SIMULAR ATAQUE
// ==========================================

function simulateAttack() {

    simulateButton.disabled = true;


    attackStatus.innerHTML = `

        <i class="fa-solid fa-spinner fa-spin"></i>

        Detectando atividade suspeita...

    `;


    setTimeout(() => {


        // Escolhe ataque

        const attack =
            attacks[
                Math.floor(
                    Math.random() * attacks.length
                )
            ];


        // Atualiza contadores

        threats++;

        logins++;


        if (attack.type !== "Tentativa de login") {

            suspiciousIPs++;

        }


        threatCount.textContent =
            threats;

        loginCount.textContent =
            logins;

        ipCount.textContent =
            suspiciousIPs;


        // Adiciona informações

        addLog(attack);

        addAlert(attack);


        // Status

        attackStatus.innerHTML = `

            <i class="fa-solid fa-shield-halved"></i>

            AMEAÇA DETECTADA E BLOQUEADA

        `;


        attackStatus.style.color =
            "#00ff88";


        simulateButton.disabled = false;


    }, 1500);

}


// ==========================================
// BOTÃO
// ==========================================

simulateButton.addEventListener(
    "click",
    simulateAttack
);


// ==========================================
// LIMPAR LOGS
// ==========================================

document
    .getElementById("clearLogs")
    .addEventListener("click", function () {

        logTable.innerHTML = "";

    });


// ==========================================
// EVENTOS AUTOMÁTICOS
// ==========================================

function automaticEvent() {

    const attack =
        attacks[
            Math.floor(
                Math.random() * attacks.length
            )
        ];


    // Eventos automáticos
    // são menos frequentes

    if (Math.random() > 0.5) {

        threats++;

        threatCount.textContent =
            threats;

        addLog(attack);
        addAlert(attack);

    }

}


// A cada 12 segundos,
// o sistema recebe um evento simulado

setInterval(
    automaticEvent,
    12000
);


// ==========================================
// LOGS INICIAIS
// ==========================================

const initialLogs = [

    {
        type: "Login bem-sucedido",
        description: "Usuário: admin",
        status: "OK",
        class: "ok"
    },

    {
        type: "Tentativa de login",
        description: "Usuário: root (falhou)",
        status: "FALHA",
        class: "blocked"
    },

    {
        type: "IP suspeito",
        description: "Conexão de local incomum",
        status: "ALERTA",
        class: "alert"
    }

];


initialLogs.forEach(
    log => addLog(log)
);


// ==========================================
// MENSAGEM INICIAL
// ==========================================

addAlert({

    type: "Sistema iniciado",

    class: "green"

});