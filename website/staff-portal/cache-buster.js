function addCacheBuster(url) {
    const cacheBuster = `cb=${new Date().getTime()}`;
    return url.includes('?') ? `${url}&${cacheBuster}` : `${url}?${cacheBuster}`;
}