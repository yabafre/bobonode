// core/api/symfobojs.js
/**
 * Symfobojs is a simple wrapper around the fetch API that adds retries and authorization headers
 * @param {Object} options
 * @param {string} options.baseUrl - The base URL of the API
 * @param {number} options.maxRetries - The maximum number of retries
 * @param {string} options.apiKey - The API key to use for store requests
 */

class Symfobojs {
  constructor({ baseUrl, maxRetries = 3, apiKey }) {
    this.baseUrl = baseUrl;
    this.maxRetries = maxRetries;
    this.apiKey = apiKey;
  }

  async fetchWithRetry(endpoint, options, retries = this.maxRetries) {
    const headers = {
      'Content-Type': 'application/json',
      'X-Api-Key': this.apiKey,
      ...options.headers,
    };
    try {
      console.log(this.baseUrl, endpoint, options, retries)
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        ...options,
        headers,
      });
      const data = await response.json();
      // console.log('symfobojs fetchWithRetry', data)
      if (!response.status === 200)
      {
        const errorBody = await response.text();
        throw new Error(`Network response was not ok: ${errorBody}`);
      }
      return data;
    } catch (error) {
      if (retries > 0) {
        console.log(`Retrying... (${retries} attempts left)`);
        return this.fetchWithRetry(endpoint, options, retries - 1);
      } else {
        throw new Error(`Max retries reached. ${error}`);
      }
    }
  }
  get(endpoint, headers = {}) {
    console.log('symfobojs get', endpoint)
    if (endpoint === '/api/modules') {
      return [
        // Simuler les données renvoyées par l'API
        {
          name: 'product',
          description: 'Module for managing products',
          author: 'Developer',
          version: '1.0.0',
          available: true,
          category: 'Features',
          enabled: true, // cet état peut être initialisé à partir du backend lors du chargement de l'application
          componentPath: 'ProductView',
          logo: 'logo.png',
        },
      ];
    }

    return this.fetchWithRetry(endpoint, {
      method: 'GET',
      headers: {
        ...headers,
      },
    });
  }
  post(endpoint, data, headers = {}) {
    console.log('symfobojs post', data)
    return this.fetchWithRetry(endpoint, {
      method: 'POST',
      headers: {
        ...headers,
        'Content-Type': 'application/json',
      },
      body: data,
    });
  }
  put(endpoint, data, headers = {}) {
    console.log('symfobojs put', data)
    return this.fetchWithRetry(endpoint, {
      method: 'PUT',
      headers: {
        ...headers,
        'Content-Type': 'application/json',
      },
      body: data,
    });
  }
  patch(endpoint, data, headers = {}) {
    console.log('symfobojs patch', data)
    return this.fetchWithRetry(endpoint, {
      method: 'PATCH',
      headers: {
        ...headers,
        'Content-Type': 'application/json',
      },
      body: data,
    });
  }
  delete(endpoint, headers = {}) {
    console.log('symfobojs delete', endpoint)
    return this.fetchWithRetry(endpoint, {
      method: 'DELETE',
      headers: {
        ...headers,
        'Content-Type': 'application/json',
      },
    });
  }
}

export default Symfobojs;
