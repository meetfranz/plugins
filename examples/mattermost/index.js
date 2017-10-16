module.exports = Franz => class Mattermost extends Franz {
  async validateUrl(url) {
    const baseUrl = new window.URL(url);
    try {
      const resp = await window.fetch(`${baseUrl.origin}/api/v3/users/initial_load`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await resp.json();

      return Object.hasOwnProperty.call(data, 'client_cfg');
    } catch (err) {
      console.error(err);
    }

    return false;
  }
};
