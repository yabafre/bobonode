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
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        ...options,
        headers: {
          ...options.headers,
          'X-Api-Key': `${this.apiKey}`,
        },
      });
      if (!response.ok) throw new Error('Network response was not ok');
      return response.json();
    } catch (error) {
      if (retries > 0) {
        console.log(`Retrying... (${retries} attempts left)`);
        return this.fetchWithRetry(endpoint, options, retries - 1);
      } else {
        throw new Error(`Max retries reached. ${error}`);
      }
    }
  }
  get(endpoint) {
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
        'Content-Type': 'application/json',
      },
    });
  }
  post(endpoint, data) {
    console.log('symfobojs post', data)
    return this.fetchWithRetry(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  }
  put(endpoint, data) {
    console.log('symfobojs put', data)
    return this.fetchWithRetry(endpoint, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  }
  patch(endpoint, data) {
    console.log('symfobojs patch', data)
    return this.fetchWithRetry(endpoint, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  }
  delete(endpoint) {
    console.log('symfobojs delete', endpoint)
    return this.fetchWithRetry(endpoint, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}

export default Symfobojs;
