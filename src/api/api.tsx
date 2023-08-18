// export const API_URL = "http://localhost:3333";
export const API_URL = "https://api-mensagens-node.onrender.com";

interface Body {
  nome: string;
  senha: string;
}

export function TOKEN_POST(body: Body) {
  return {
    url: API_URL + "/usuarios/login",
    options: {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    },
  };
}

export function TOKEN_VALIDATE_POST(token: string) {
  return {
    url: API_URL + "/usuarios/autenticar",
    options: {
      method: "POST",
      headers: {
        "x-access-token": token,
      },
    },
  };
}

export function MESSAGES_GET(token: string) {
  return {
    url: API_URL + "/usuarios",
    options: {
      method: "GET",
      headers: {
        "x-access-token": token,
      },
    },
  };
}

export function CHAT_POST(token: string) {
  return {
    url: API_URL + "/mensagens/",
    options: {
      method: "GET",
      headers: {
        "x-access-token": token,
      },
    },
  };
}

export function CHAT_GET(token: string, params: string) {
  return {
    url: API_URL + "/mensagens/" + params,
    options: {
      method: "GET",
      headers: {
        "x-access-token": token,
      },
    },
  };
}

export function MESSAGE_POST(token: string, params: string, body: {}) {
  return {
    url: API_URL + "/mensagens/" + params,
    options: {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
      body: JSON.stringify(body),
    },
  };
}

export function USER_GET(token: string, params: string) {
  return {
    url: API_URL + "/usuarios/" + params,
    options: {
      method: "GET",
      headers: {
        "x-access-token": token,
      },
    },
  };
}

export function USER_POST(body: Body) {
  return {
    url: API_URL + "/usuarios/cadastro",
    options: {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    },
  };
}

export function PASSWORD_LOST(body: Body) {
  return {
    url: API_URL + "/api/password/lost",
    options: {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    },
  };
}

export function PASSWORD_RESET(body: Body) {
  return {
    url: API_URL + "/api/password/reset",
    options: {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    },
  };
}
