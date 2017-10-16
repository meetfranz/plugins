module.exports = (Franz) => {
  const getMessages = function getMessages() {
    const directMessages = document.querySelectorAll('.sidebar--left .has-badge .badge').length;
    const allMessages = document.querySelectorAll('.sidebar--left .has-badge').length - directMessages;

    Franz.setBadge(directMessages, allMessages);
  };

  Franz.loop(getMessages);
};
