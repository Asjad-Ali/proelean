const apiBaseURL = "https://api.dex.proelean.com/api";
// const csrfToken = document.head.querySelector('meta[name="csrf-token"]');
const TOKEN = localStorage.getItem('PROELEAN_TOKEN') || null;
class API {
  async request(
    route,
    payload = null,
    method = "GET",
    contentType = "application/json"
  ) {
    let options = {
      method: method,
      headers: {
        // "Content-Type" : contentType=='application/json' ? contentType : delete headers['Content-Type'],
        "Accept": 'application/json',
        "Authorization": `Bearer ${TOKEN}`,
      },
    };

    if(contentType=='application/json') {
      options.headers['Content-Type'] = contentType;
    }

    //payload will be sent as form data if content type is multipart/form-data
    if (options.method !== "GET") {
      if (contentType.toLowerCase() == "multipart/form-data") {
        const formData = new FormData();
        for (const key in payload) {
          formData.append(key, payload[key]);
        }
        options.body = formData;
      } else if (payload && typeof payload === "object") {
        options.body = JSON.stringify(payload);
      }
    } else if (payload) {
      // payload will be appended to the url  if method is GET
      route = this.appendParams(route, payload);
    }

    try {
      let response = await fetch(this.url(route), options);
      return { status: response.status, ...(await response.json()) };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async get(route, payload = null) {
    return await this.request(route, payload, "GET");
  }

  async post(route, payload = null) {
    return await this.request(route, payload, "POST");
  }

  async put(route, payload = null) {
    return await this.request(route, payload, "PUT");
  }

  async delete(route, payload = null) {
    return await this.request(route, payload, "DELETE");
  }

  async patch(route, payload = null) {
    return await this.request(route, payload, "PATCH");
  }

  async upload(route, payload = null) {
    return await this.request(route, payload, "POST", "multipart/form-data");
  }

  async formData(route, payload = null) {
    return await this.request(route, payload, "POST", "multipart/form-data");
  }

  appendParams(route, payload) {
    let url = new URL(this.url(route));
    let params = new URLSearchParams(url.search.slice(1));

    if (payload && typeof payload === "object") {
      for (let key in payload) {
        params.append(key, payload[key]);
      }
    }
    route = route.split("?")[0] + "?" + params.toString();
    return route;
  }

  url(route) {
    return `${apiBaseURL}${
      apiBaseURL && apiBaseURL.slice(apiBaseURL.length - 1) == "/" ? "" : "/"
    }${route}`;
  }
}

export default new API();
