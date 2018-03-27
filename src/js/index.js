document.addEventListener('DOMContentLoaded', () => {
  // Configure OS specifics
  let osName = null;
  let osClass = null;

  if (navigator.appVersion.includes('Win')) {
    osName = 'Windows';
    osClass = 'windows';
  } else if (navigator.appVersion.includes('Mac')) {
    osName = 'OSX';
    osClass = 'osx';
  } else if (navigator.appVersion.includes('Linux')) {
    osName = 'Linux';
    osClass = 'linux';
  } else if (navigator.appVersion.includes('X11')) {
    osName = 'Unix';
    osClass = 'linux';
  }

  // Add classes / text
  document.querySelector('.Download-title-os').innerHTML = osName;
  document.querySelector('.Download-screenshot').classList.add(`is-${osClass}`);
});
