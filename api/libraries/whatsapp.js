const axios = require('axios')
const fs = require('fs')

const fbGraphURL = 'https://graph.facebook.com/v18.0'

const whatsappToken =
  'EAANUTgi7hgIBO3RrrsaRTmxQ3tcxtTW8nFR6XdZAvDoZBFhCoglRlvjqZBu3jC61ZBzNpS0ZAMnFaLnnERJvmjoyB4NYtqnprWrp8OuoZB0jgxY2KEAH7kTp9imiMUJ1ZCTSPuYB0WTTwxqoxsGyuLonuj6PsvnRIkMvfA4M99RZCy8xWpZCZBHaB3Ml74JO7zJwtplrhlcP1gM4rkSdhfEaUZD'
const from = '128759850119056'
const STATIC_PATH = 'public/assets/'

/**
 * @param string TemplateName
 * Leave it empty to get all the balances from supported currencies and pass the currency code to get the balance for the currency.
 * @return array
 * [
 *  "error" => bool,
 *  "message" => string,
 *  "data" => array
 * ]
 *
 *  wpLib.sendTemplateMessage("first_greet", FromNumber, [
 *     {
 *         "type": "text",
 *         "text": FromName
 *     }
 * ])
 *
 */

const sendTemplateMessage = (TemplateName, to, parameters) => {
  return new Promise((resolve, reject) => {
    let data = JSON.stringify({
      messaging_product: 'whatsapp',
      to: to,
      type: 'template',
      template: {
        name: TemplateName,
        language: {
          code: 'en'
        },
        components: [
          {
            type: 'body',
            parameters: parameters
          }
        ]
      }
    })

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: fbGraphURL + '/' + from + '/messages',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + whatsappToken
      },
      data: data
    }

    axios
      .request(config)
      .then(response => {
        resolve(response.data)
      })
      .catch(error => {
        reject(error)
      })
  })
}

const sendTextMessage = (to, message) => {
  return new Promise((resolve, reject) => {
    let data = JSON.stringify({
      messaging_product: 'whatsapp',
      recipient_type: 'individual',
      to: to,
      type: 'text',
      text: {
        preview_url: false,
        body: message
      }
    })

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://graph.facebook.com/v18.0/' + from + '/messages',
      headers: {
        Authorization: 'Bearer ' + whatsappToken,
        'Content-Type': 'application/json'
      },
      data: data
    }

    axios
      .request(config)
      .then(response => {
        resolve(response.data)
      })
      .catch(error => {
        reject(error)
      })
  })
}

const getaAssetURL = mediaID => {
  return new Promise((resolve, reject) => {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: fbGraphURL + '/' + mediaID + '/',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + whatsappToken
      }
    }
    axios
      .request(config)
      .then(response => {
        resolve(response.data)
      })
      .catch(error => {
        reject(error)
      })
  })
}

const getAndMoveAsset = async mediaID => {
  const urlData = await getaAssetURL(mediaID)

  return new Promise((resolve, reject) => {
    let config = {
      method: 'get',
      url: urlData.url,
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + whatsappToken
      },
      responseType: 'arraybuffer'
    }

    axios
      .request(config)
      .then(async response => {
        const imageBuffer = Buffer.from(response.data, 'binary')
        const newName = STATIC_PATH + Date.now() + '.' + extention[urlData.mime_type]
        fs.writeFileSync(newName, imageBuffer)
        resolve({
          url: urlData,
          path: newName
        })
      })
      .catch(error => {
        reject(error)
      })
  })
}

module.exports = {
  getaAssetURL,
  getAndMoveAsset,
  getaAssetURL,
  sendTemplateMessage,
  sendTextMessage
}

const extention = {
  'audio/x-mpeg': 'mpega',
  'application/postscript': 'ps',
  'audio/x-aiff': 'aiff',
  'application/x-aim': 'aim',
  'image/x-jg': 'art',
  'video/x-ms-asf': 'asx',
  'audio/basic': 'ulw',
  'video/x-msvideo': 'avi',
  'video/x-rad-screenplay': 'avx',
  'application/x-bcpio': 'bcpio',
  'application/octet-stream': 'exe',
  'image/bmp': 'dib',
  'text/html': 'html',
  'application/x-cdf': 'cdf',
  'application/pkix-cert': 'cer',
  'application/java': 'class',
  'application/x-cpio': 'cpio',
  'application/x-csh': 'csh',
  'text/css': 'css',
  'application/msword': 'doc',
  'application/xml-dtd': 'dtd',
  'video/x-dv': 'dv',
  'application/x-dvi': 'dvi',
  'application/vnd.ms-fontobject': 'eot',
  'text/x-setext': 'etx',
  'image/gif': 'gif',
  'application/x-gtar': 'gtar',
  'application/x-gzip': 'gz',
  'application/x-hdf': 'hdf',
  'application/mac-binhex40': 'hqx',
  'text/x-component': 'htc',
  'image/ief': 'ief',
  'text/vnd.sun.j2me.app-descriptor': 'jad',
  'application/java-archive': 'jar',
  'text/x-java-source': 'java',
  'application/x-java-jnlp-file': 'jnlp',
  'image/jpeg': 'jpg',
  'application/javascript': 'js',
  'text/plain': 'txt',
  'application/json': 'json',
  'audio/midi': 'midi',
  'application/x-latex': 'latex',
  'audio/x-mpegurl': 'm3u',
  'image/x-macpaint': 'pnt',
  'text/troff': 'tr',
  'application/mathml+xml': 'mathml',
  'application/x-mif': 'mif',
  'video/quicktime': 'qt',
  'video/x-sgi-movie': 'movie',
  'audio/mpeg': 'mpa',
  'video/mp4': 'mp4',
  'video/mpeg': 'mpg',
  'video/mpeg2': 'mpv2',
  'application/x-wais-source': 'src',
  'application/x-netcdf': 'nc',
  'application/oda': 'oda',
  'application/vnd.oasis.opendocument.database': 'odb',
  'application/vnd.oasis.opendocument.chart': 'odc',
  'application/vnd.oasis.opendocument.formula': 'odf',
  'application/vnd.oasis.opendocument.graphics': 'odg',
  'application/vnd.oasis.opendocument.image': 'odi',
  'application/vnd.oasis.opendocument.text-master': 'odm',
  'application/vnd.oasis.opendocument.presentation': 'odp',
  'application/vnd.oasis.opendocument.spreadsheet': 'ods',
  'application/vnd.oasis.opendocument.text': 'odt',
  'application/vnd.oasis.opendocument.graphics-template': 'otg',
  'application/vnd.oasis.opendocument.text-web': 'oth',
  'application/vnd.oasis.opendocument.presentation-template': 'otp',
  'application/vnd.oasis.opendocument.spreadsheet-template': 'ots',
  'application/vnd.oasis.opendocument.text-template': 'ott',
  'application/ogg': 'ogx',
  'video/ogg': 'ogv',
  'audio/ogg': 'spx',
  'application/x-font-opentype': 'otf',
  'audio/flac': 'flac',
  'application/annodex': 'anx',
  'audio/annodex': 'axa',
  'video/annodex': 'axv',
  'application/xspf+xml': 'xspf',
  'image/x-portable-bitmap': 'pbm',
  'image/pict': 'pict',
  'application/pdf': 'pdf',
  'image/x-portable-graymap': 'pgm',
  'audio/x-scpls': 'pls',
  'image/png': 'png',
  'image/x-portable-anymap': 'pnm',
  'image/x-portable-pixmap': 'ppm',
  'application/vnd.ms-powerpoint': 'pps',
  'image/vnd.adobe.photoshop': 'psd',
  'image/x-quicktime': 'qtif',
  'image/x-cmu-raster': 'ras',
  'application/rdf+xml': 'rdf',
  'image/x-rgb': 'rgb',
  'application/vnd.rn-realmedia': 'rm',
  'application/rtf': 'rtf',
  'text/richtext': 'rtx',
  'application/font-sfnt': 'sfnt',
  'application/x-sh': 'sh',
  'application/x-shar': 'shar',
  'application/x-stuffit': 'sit',
  'application/x-sv4cpio': 'sv4cpio',
  'application/x-sv4crc': 'sv4crc',
  'image/svg+xml': 'svgz',
  'application/x-shockwave-flash': 'swf',
  'application/x-tar': 'tar',
  'application/x-tcl': 'tcl',
  'application/x-tex': 'tex',
  'application/x-texinfo': 'texinfo',
  'image/tiff': 'tiff',
  'text/tab-separated-values': 'tsv',
  'application/x-font-ttf': 'ttf',
  'application/x-ustar': 'ustar',
  'application/voicexml+xml': 'vxml',
  'image/x-xbitmap': 'xbm',
  'application/xhtml+xml': 'xhtml',
  'application/vnd.ms-excel': 'xls',
  'application/xml': 'xsl',
  'image/x-xpixmap': 'xpm',
  'application/xslt+xml': 'xslt',
  'application/vnd.mozilla.xul+xml': 'xul',
  'image/x-xwindowdump': 'xwd',
  'application/vnd.visio': 'vsd',
  'audio/x-wav': 'wav',
  'image/vnd.wap.wbmp': 'wbmp',
  'text/vnd.wap.wml': 'wml',
  'application/vnd.wap.wmlc': 'wmlc',
  'text/vnd.wap.wmlsc': 'wmls',
  'application/vnd.wap.wmlscriptc': 'wmlscriptc',
  'video/x-ms-wmv': 'wmv',
  'application/font-woff': 'woff',
  'application/font-woff2': 'woff2',
  'model/vrml': 'wrl',
  'application/wspolicy+xml': 'wspolicy',
  'application/x-compress': 'z',
  'application/zip': 'zip'
}
