const path = require('path')
const nodemailer = require('nodemailer')

const indexPath = './'
const port = 8000

let BASE_URL = `http://localhost:${port}`
const SUB_URI = '/api'
const STATIC_PATH = '/public'

let dbconfig = {
  host: '',
  user: 'root',
  port: '',
  password: '',
  database: 'medsers'
}
const mode = 'dev' // dev,live

if (mode == 'live') {
  dbconfig = {
    host: '',
    user: 'root',
    port: '',
    password: '',
    database: 'medsers'
  }

  BASE_URL = ``
}

const jwtConfig = {
  secret: 'dd5f3089-40c3-403d-af14-d0c228b05cb4',
  refreshTokenSecret: '7c4c1c50-3230-45bf-9eae-c9b2e401c767',
  expireTime: '120m',
  refreshTokenExpireTime: '130m'
}

const mailConfig = {
  mail: 'medsers@espeech.in',
  password: 'Infinitie@0124'
}

const transporter = nodemailer.createTransport({
  port: 465, // true for 465, false for other ports
  host: 'smtp.hostinger.com',
  auth: {
    user: mailConfig.mail,
    pass: mailConfig.password
  },
  secure: true
})

const fbGraphURL = 'https://graph.facebook.com/v18.0'

const whatsappToken =
  'EAANUTgi7hgIBO2NzhGJpj6oSak4ZAHBIeZBbqdqvFtZBAjZCDz7k22ORfOsqHtiJ6p0R904ImvwZCqQLoxpUEC1u1hhd6MgL3Idbe55Ajsz4FtO9mOOHUvPi45ICFZA02UWVWqG3Hqs8kdh2L1yT0aQSAgEioROU2tmKFhQyhugvkONSlpHZCZAVpTtRZAaVM1LKpEH9G0pZBH4pgyJPXuJysZD'
const whatsappWebhookVerifyToken = 'test_jay_token'

const whatsappFrom = '128759850119056'

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

module.exports = {
  port,
  dbconfig,
  BASE_URL,
  SUB_URI,
  jwtConfig,
  STATIC_PATH,
  indexPath,
  mailConfig,
  transporter,
  whatsappToken,
  fbGraphURL,
  whatsappWebhookVerifyToken,
  whatsappFrom,
  extention
}
