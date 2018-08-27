import axios from 'axios'



export const getInterests = axios.get('/user?ID=12345')
.then( (response) => {
  // handle success
  console.log(response);
})
.catch(function (error) {
  // handle error
  console.log(error);
})

export const countryOptions = [
  { key: 'af', value:'Afghanistan', flag: 'af', text: 'Afghanistan' },
  { key: 'ax', value: 'Aland Islands', flag: 'ax', text: 'Aland Islands' },
  { key: 'al', value: 'Albania', flag: 'al', text: 'Albania' },
  { key: 'dz', value: 'Algeria', flag: 'dz', text: 'Algeria' },
  { key: 'as', value: 'American Samoa', flag: 'as', text: 'American Samoa' },
  { key: 'ad', value: 'Andorra', flag: 'ad', text: 'Andorra' },
  { key: 'ao', value: 'Angola', flag: 'ao', text: 'Angola' },
  { key: 'ai', value: 'Anguilla', flag: 'ai', text: 'Anguilla' },
  { key: 'ag', value: 'Antigua', flag: 'ag', text: 'Antigua' },
  { key: 'ar', value: 'Argentina', flag: 'ar', text: 'Argentina' },
  { key: 'am', value: 'Armenia', flag: 'am', text: 'Armenia' },
  { key: 'aw', value: 'Aruba', flag: 'aw', text: 'Aruba' },
  { key: 'au', value: 'Australia', flag: 'au', text: 'Australia' },
  { key: 'at', value: 'Austria', flag: 'at', text: 'Austria' },
  { key: 'az', value: 'Azerbaijan', flag: 'az', text: 'Azerbaijan' },
  { key: 'bs', value: 'Bahamas', flag: 'bs', text: 'Bahamas' },
  { key: 'bh', value: 'Bahrain', flag: 'bh', text: 'Bahrain' },
  { key: 'bd', value: 'Bangladesh', flag: 'bd', text: 'Bangladesh' },
  { key: 'bb', value: 'Barbados', flag: 'bb', text: 'Barbados' },
  { key: 'by', value: 'Belarus', flag: 'by', text: 'Belarus' },
  { key: 'be', value: 'Belgium', flag: 'be', text: 'Belgium' },
  { key: 'bz', value: 'Belize', flag: 'bz', text: 'Belize' },
  { key: 'bj', value: 'Benin', flag: 'bj', text: 'Benin' },
  { key: 'bm', value: 'Bermuda', flag: 'bm', text: 'Bermuda' },
  { key: 'bt', value: 'Bhutan', flag: 'bt', text: 'Bhutan' },
  { key: 'bo', value: 'Bolivia', flag: 'bo', text: 'Bolivia' },
  { key: 'ba', value: 'Bosnia', flag: 'ba', text: 'Bosnia' },
  { key: 'bw', value: 'Botswana', flag: 'bw', text: 'Botswana' },
  { key: 'bv', value: 'Bouvet Island', flag: 'bv', text: 'Bouvet Island' },
  { key: 'br', value: 'Brazil', flag: 'br', text: 'Brazil' },
  { key: 'vg', value: 'British Virgin Islands', flag: 'vg', text: 'British Virgin Islands' },
  { key: 'bn', value: 'Brunei', flag: 'bn', text: 'Brunei' },
  { key: 'bg', value: 'Bulgaria', flag: 'bg', text: 'Bulgaria' },
  { key: 'bf', value: 'Burkina Faso', flag: 'bf', text: 'Burkina Faso' },
  { key: 'bi', value: 'Burundi', flag: 'bi', text: 'Burundi' },
  { key: 'tc', value: 'Caicos Islands', flag: 'tc', text: 'Caicos Islands' },
  { key: 'kh', value: 'Cambodia', flag: 'kh', text: 'Cambodia' },
  { key: 'cm', value: 'Cameroon', flag: 'cm', text: 'Cameroon' },
  { key: 'ca', value: 'Canada', flag: 'ca', text: 'Canada' },
  { key: 'cv', value: 'Cape Verde', flag: 'cv', text: 'Cape Verde' },
  { key: 'ky', value: 'Cayman Islands', flag: 'ky', text: 'Cayman Islands' },
  { key: 'cf', value: 'Central African Republic', flag: 'cf', text: 'Central African Republic' },
  { key: 'td', value: 'Chad', flag: 'td', text: 'Chad' },
  { key: 'cl', value: 'Chile', flag: 'cl', text: 'Chile' },
  { key: 'cn', value: 'China', flag: 'cn', text: 'China' },
  { key: 'cx', value: 'Christmas Island', flag: 'cx', text: 'Christmas Island' },
  { key: 'cc', value: 'Cocos Islands', flag: 'cc', text: 'Cocos Islands' },
  { key: 'co', value: 'Colombia', flag: 'co', text: 'Colombia' },
  { key: 'km', value: 'Comoros', flag: 'km', text: 'Comoros' },
  { key: 'cg', value: 'Congo Brazzaville', flag: 'cg', text: 'Congo Brazzaville' },
  { key: 'cd', value: 'Congo', flag: 'cd', text: 'Congo' },
  { key: 'ck', value: 'Cook Islands', flag: 'ck', text: 'Cook Islands' },
  { key: 'cr', value: 'Costa Rica', flag: 'cr', text: 'Costa Rica' },
  { key: 'ci', value: 'Cote Divoire', flag: 'ci', text: 'Cote Divoire' },
  { key: 'hr', value: 'Croatia', flag: 'hr', text: 'Croatia' },
  { key: 'cu', value: 'Cuba', flag: 'cu', text: 'Cuba' },
  { key: 'cy', value: 'Cyprus', flag: 'cy', text: 'Cyprus' },
  { key: 'cz', value: 'Czech Republic', flag: 'cz', text: 'Czech Republic' },
  { key: 'dk', value: 'Denmark', flag: 'dk', text: 'Denmark' },
  { key: 'dj', value: 'Djibouti', flag: 'dj', text: 'Djibouti' },
  { key: 'dm', value: 'Dominica', flag: 'dm', text: 'Dominica' },
  { key: 'do', value: 'Dominican Republic', flag: 'do', text: 'Dominican Republic' },
  { key: 'ec', value: 'Ecuador', flag: 'ec', text: 'Ecuador' },
  { key: 'eg', value: 'Egypt', flag: 'eg', text: 'Egypt' },
  { key: 'sv', value: 'El Salvador', flag: 'sv', text: 'El Salvador' },
  { key: 'gb', value: 'England', flag: 'gb', text: 'England' },
  { key: 'gq', value: 'Equatorial Guinea', flag: 'gq', text: 'Equatorial Guinea' },
  { key: 'er', value: 'Eritrea', flag: 'er', text: 'Eritrea' },
  { key: 'ee', value: 'Estonia', flag: 'ee', text: 'Estonia' },
  { key: 'et', value: 'Ethiopia', flag: 'et', text: 'Ethiopia' },
  { key: 'eu', value: 'European Union', flag: 'eu', text: 'European Union' },
  { key: 'fk', value: 'Falkland Islands', flag: 'fk', text: 'Falkland Islands' },
  { key: 'fo', value: 'Faroe Islands', flag: 'fo', text: 'Faroe Islands' },
  { key: 'fj', value: 'Fiji', flag: 'fj', text: 'Fiji' },
  { key: 'fi', value: 'Finland', flag: 'fi', text: 'Finland' },
  { key: 'fr', value: 'France', flag: 'fr', text: 'France' },
  { key: 'gf', value: 'French Guiana', flag: 'gf', text: 'French Guiana' },
  { key: 'pf', value: 'French Polynesia', flag: 'pf', text: 'French Polynesia' },
  { key: 'tf', value: 'French Territories', flag: 'tf', text: 'French Territories' },
  { key: 'ga', value: 'Gabon', flag: 'ga', text: 'Gabon' },
  { key: 'gm', value: 'Gambia', flag: 'gm', text: 'Gambia' },
  { key: 'ge', value: 'Georgia', flag: 'ge', text: 'Georgia' },
  { key: 'de', value: 'Germany', flag: 'de', text: 'Germany' },
  { key: 'gh', value: 'Ghana', flag: 'gh', text: 'Ghana' },
  { key: 'gi', value: 'Gibraltar', flag: 'gi', text: 'Gibraltar' },
  { key: 'gr', value: 'Greece', flag: 'gr', text: 'Greece' },
  { key: 'gl', value: 'Greenland', flag: 'gl', text: 'Greenland' },
  { key: 'gd', value: 'Grenada', flag: 'gd', text: 'Grenada' },
  { key: 'gp', value: 'Guadeloupe', flag: 'gp', text: 'Guadeloupe' },
  { key: 'gu', value: 'Guam', flag: 'gu', text: 'Guam' },
  { key: 'gt', value: 'Guatemala-Bissau', flag: 'gt', text: 'Guatemala' },
  { key: 'gw', value: 'Guinea', flag: 'gw', text: 'Guinea-Bissau' },
  { key: 'gn', value: 'Guinea', flag: 'gn', text: 'Guinea' },
  { key: 'gy', value: 'Guyana', flag: 'gy', text: 'Guyana' },
  { key: 'ht', value: 'Haiti', flag: 'ht', text: 'Haiti' },
  { key: 'hm', value: 'Heard Island', flag: 'hm', text: 'Heard Island' },
  { key: 'hn', value: 'Honduras', flag: 'hn', text: 'Honduras' },
  { key: 'hk', value: 'Hong Kong', flag: 'hk', text: 'Hong Kong' },
  { key: 'hu', value: 'Hungary', flag: 'hu', text: 'Hungary' },
  { key: 'is', value: 'Iceland', flag: 'is', text: 'Iceland' },
  { key: 'in', value: 'India', flag: 'in', text: 'India' },
  { key: 'io', value: 'Indian Ocean Territory', flag: 'io', text: 'Indian Ocean Territory' },
  { key: 'id', value: 'Indonesia', flag: 'id', text: 'Indonesia' },
  { key: 'ir', value: 'Iran', flag: 'ir', text: 'Iran' },
  { key: 'iq', value: 'Iraq', flag: 'iq', text: 'Iraq' },
  { key: 'ie', value: 'Ireland', flag: 'ie', text: 'Ireland' },
  { key: 'il', value: 'Israel', flag: 'il', text: 'Israel' },
  { key: 'it', value: 'Italy', flag: 'it', text: 'Italy' },
  { key: 'jm', value: 'Jamaica', flag: 'jm', text: 'Jamaica' },
  { key: 'jp', value: 'Japan', flag: 'jp', text: 'Japan' },
  { key: 'jo', value: 'Jordan', flag: 'jo', text: 'Jordan' },
  { key: 'kz', value: 'Kazakhstan', flag: 'kz', text: 'Kazakhstan' },
  { key: 'ke', value: 'Kenya', flag: 'ke', text: 'Kenya' },
  { key: 'ki', value: 'Kiribati', flag: 'ki', text: 'Kiribati' },
  { key: 'kw', value: 'Kuwait', flag: 'kw', text: 'Kuwait' },
  { key: 'kg', value: 'Kyrgyzstan', flag: 'kg', text: 'Kyrgyzstan' },
  { key: 'la', value: 'Laos', flag: 'la', text: 'Laos' },
  { key: 'lv', value: 'Latvia', flag: 'lv', text: 'Latvia' },
  { key: 'lb', value: 'Lebanon', flag: 'lb', text: 'Lebanon' },
  { key: 'ls', value: 'Lesotho', flag: 'ls', text: 'Lesotho' },
  { key: 'lr', value: 'Liberia', flag: 'lr', text: 'Liberia' },
  { key: 'ly', value: 'Libya', flag: 'ly', text: 'Libya' },
  { key: 'li', value: 'Liechtenstein', flag: 'li', text: 'Liechtenstein' },
  { key: 'lt', value: 'Lithuania', flag: 'lt', text: 'Lithuania' },
  { key: 'lu', value: 'Luxembourg', flag: 'lu', text: 'Luxembourg' },
  { key: 'mo', value: 'Macau', flag: 'mo', text: 'Macau' },
  { key: 'mk', value: 'Macedonia', flag: 'mk', text: 'Macedonia' },
  { key: 'mg', value: 'Madagascar', flag: 'mg', text: 'Madagascar' },
  { key: 'mw', value: 'Malawi', flag: 'mw', text: 'Malawi' },
  { key: 'my', value: 'Malaysia', flag: 'my', text: 'Malaysia' },
  { key: 'mv', value: 'Maldives', flag: 'mv', text: 'Maldives' },
  { key: 'ml', value: 'Mali', flag: 'ml', text: 'Mali' },
  { key: 'mt', value: 'Malta', flag: 'mt', text: 'Malta' },
  { key: 'mh', value: 'Marshall Islands', flag: 'mh', text: 'Marshall Islands' },
  { key: 'mq', value: 'Martinique', flag: 'mq', text: 'Martinique' },
  { key: 'mr', value: 'Mauritania', flag: 'mr', text: 'Mauritania' },
  { key: 'mu', value: 'Mauritius', flag: 'mu', text: 'Mauritius' },
  { key: 'yt', value: 'Mayotte', flag: 'yt', text: 'Mayotte' },
  { key: 'mx', value: 'Mexico', flag: 'mx', text: 'Mexico' },
  { key: 'fm', value: 'Micronesia', flag: 'fm', text: 'Micronesia' },
  { key: 'md', value: 'Moldova', flag: 'md', text: 'Moldova' },
  { key: 'mc', value: 'Monaco', flag: 'mc', text: 'Monaco' },
  { key: 'mn', value: 'Mongolia', flag: 'mn', text: 'Mongolia' },
  { key: 'me', value: 'Montenegro', flag: 'me', text: 'Montenegro' },
  { key: 'ms', value: 'Montserrat', flag: 'ms', text: 'Montserrat' },
  { key: 'ma', value: 'Morocco', flag: 'ma', text: 'Morocco' },
  { key: 'mz', value: 'Mozambique', flag: 'mz', text: 'Mozambique' },
  { key: 'na', value: 'Namibia', flag: 'na', text: 'Namibia' },
  { key: 'nr', value: 'Nauru', flag: 'nr', text: 'Nauru' },
  { key: 'np', value: 'Nepal', flag: 'np', text: 'Nepal' },
  { key: 'an', value: 'Netherlands Antilles', flag: 'an', text: 'Netherlands Antilles' },
  { key: 'nl', value: 'Netherlands', flag: 'nl', text: 'Netherlands' },
  { key: 'nc', value: 'New Caledonia', flag: 'nc', text: 'New Caledonia' },
  { key: 'pg', value: 'New Guinea', flag: 'pg', text: 'New Guinea' },
  { key: 'nz', value: 'New Zealand', flag: 'nz', text: 'New Zealand' },
  { key: 'ni', value: 'Nicaragua', flag: 'ni', text: 'Nicaragua' },
  { key: 'ne', value: 'Niger', flag: 'ne', text: 'Niger' },
  { key: 'ng', value: 'Nigeria', flag: 'ng', text: 'Nigeria' },
  { key: 'nu', value: 'Niue', flag: 'nu', text: 'Niue' },
  { key: 'nf', value: 'Norfolk Island', flag: 'nf', text: 'Norfolk Island' },
  { key: 'kp', value: 'North Korea', flag: 'kp', text: 'North Korea' },
  { key: 'mp', value: 'Northern Mariana Islands', flag: 'mp', text: 'Northern Mariana Islands' },
  { key: 'no', value: 'Norway', flag: 'no', text: 'Norway' },
  { key: 'om', value: 'Oman', flag: 'om', text: 'Oman' },
  { key: 'pk', value: 'Pakistan', flag: 'pk', text: 'Pakistan' },
  { key: 'pw', value: 'Palau', flag: 'pw', text: 'Palau' },
  { key: 'ps', value: 'Palestine', flag: 'ps', text: 'Palestine' },
  { key: 'pa', value: 'Panama', flag: 'pa', text: 'Panama' },
  { key: 'py', value: 'Paraguay', flag: 'py', text: 'Paraguay' },
  { key: 'pe', value: 'Peru', flag: 'pe', text: 'Peru' },
  { key: 'ph', value: 'Philippines', flag: 'ph', text: 'Philippines' },
  { key: 'pn', value: 'Pitcairn Islands', flag: 'pn', text: 'Pitcairn Islands' },
  { key: 'pl', value: 'Poland', flag: 'pl', text: 'Poland' },
  { key: 'pt', value: 'Portugal', flag: 'pt', text: 'Portugal' },
  { key: 'pr', value: 'Puerto Rico', flag: 'pr', text: 'Puerto Rico' },
  { key: 'qa', value: 'Qatar', flag: 'qa', text: 'Qatar' },
  { key: 're', value: 'Reunion', flag: 're', text: 'Reunion' },
  { key: 'ro', value: 'Romania', flag: 'ro', text: 'Romania' },
  { key: 'ru', value: 'Russia', flag: 'ru', text: 'Russia' },
  { key: 'rw', value: 'Rwanda Helena', flag: 'rw', text: 'Rwanda' },
  { key: 'sh', value: 'Saint', flag: 'sh', text: 'Saint Helena' },
  { key: 'kn', value: 'Saint Kitts and Nevis', flag: 'kn', text: 'Saint Kitts and Nevis' },
  { key: 'lc', value: 'Saint Lucia', flag: 'lc', text: 'Saint Lucia' },
  { key: 'pm', value: 'Saint Pierre', flag: 'pm', text: 'Saint Pierre' },
  { key: 'vc', value: 'Saint Vincent', flag: 'vc', text: 'Saint Vincent' },
  { key: 'ws', value: 'Samoa', flag: 'ws', text: 'Samoa' },
  { key: 'sm', value: 'San Marino', flag: 'sm', text: 'San Marino' },
  { key: 'gs', value: 'Sandwich Islands', flag: 'gs', text: 'Sandwich Islands' },
  { key: 'st', value: 'Sao', flag: 'st', text: 'Sao Tome' },
  { key: 'sa', value: 'Saudi Arabia', flag: 'sa', text: 'Saudi Arabia' },
  { key: 'sn', value: 'Senegal', flag: 'sn', text: 'Senegal' },
  { key: 'cs', value: 'Serbia', flag: 'cs', text: 'Serbia' },
  { key: 'rs', value: 'Serbia', flag: 'rs', text: 'Serbia' },
  { key: 'sc', value: 'Seychelles', flag: 'sc', text: 'Seychelles' },
  { key: 'sl', value: 'Sierra Leone', flag: 'sl', text: 'Sierra Leone' },
  { key: 'sg', value: 'Singapore', flag: 'sg', text: 'Singapore' },
  { key: 'sk', value: 'Slovakia', flag: 'sk', text: 'Slovakia' },
  { key: 'si', value: 'Slovenia', flag: 'si', text: 'Slovenia' },
  { key: 'sb', value: 'Solomon Islands', flag: 'sb', text: 'Solomon Islands' },
  { key: 'so', value: 'Somalia', flag: 'so', text: 'Somalia' },
  { key: 'za', value: 'South Africa', flag: 'za', text: 'South Africa' },
  { key: 'kr', value: 'South Korea', flag: 'kr', text: 'South Korea' },
  { key: 'es', value: 'Spain', flag: 'es', text: 'Spain' },
  { key: 'lk', value: 'Sri', flag: 'lk', text: 'Sri Lanka' },
  { key: 'sd', value: 'Sudan', flag: 'sd', text: 'Sudan' },
  { key: 'sr', value: 'Suriname', flag: 'sr', text: 'Suriname' },
  { key: 'sj', value: 'Svalbard', flag: 'sj', text: 'Svalbard' },
  { key: 'sz', value: 'Swaziland', flag: 'sz', text: 'Swaziland' },
  { key: 'se', value: 'Sweden', flag: 'se', text: 'Sweden' },
  { key: 'ch', value: 'Switzerland', flag: 'ch', text: 'Switzerland' },
  { key: 'sy', value: 'Syria', flag: 'sy', text: 'Syria' },
  { key: 'tw', value: 'Taiwan', flag: 'tw', text: 'Taiwan' },
  { key: 'tj', value: 'Tajikistan', flag: 'tj', text: 'Tajikistan' },
  { key: 'tz', value: 'Tanzania', flag: 'tz', text: 'Tanzania' },
  { key: 'th', value: 'Thailand', flag: 'th', text: 'Thailand' },
  { key: 'tl', value: 'Timorleste', flag: 'tl', text: 'Timorleste' },
  { key: 'tg', value: 'Togo', flag: 'tg', text: 'Togo' },
  { key: 'tk', value: 'Tokelau', flag: 'tk', text: 'Tokelau' },
  { key: 'to', value: 'Tonga', flag: 'to', text: 'Tonga' },
  { key: 'tt', value: 'Trinidad', flag: 'tt', text: 'Trinidad' },
  { key: 'tn', value: 'Tunisia', flag: 'tn', text: 'Tunisia' },
  { key: 'tr', value: 'Turkey', flag: 'tr', text: 'Turkey' },
  { key: 'tm', value: 'Turkmenistan', flag: 'tm', text: 'Turkmenistan' },
  { key: 'tv', value: 'Tuvalu', flag: 'tv', text: 'Tuvalu' },
  { key: 'ug', value: 'Uganda', flag: 'ug', text: 'Uganda' },
  { key: 'ua', value: 'Ukraine', flag: 'ua', text: 'Ukraine' },
  { key: 'ae', value: 'United Arab Emirates', flag: 'ae', text: 'United Arab Emirates' },
  { key: 'us', value: 'United States', flag: 'us', text: 'United States' },
  { key: 'uy', value: 'Uruguay', flag: 'uy', text: 'Uruguay' },
  { key: 'um', value: 'Us Minor Islands', flag: 'um', text: 'Us Minor Islands' },
  { key: 'vi', value: 'Us Virgin Islands', flag: 'vi', text: 'Us Virgin Islands' },
  { key: 'uz', value: 'Uzbekistan', flag: 'uz', text: 'Uzbekistan' },
  { key: 'vu', value: 'Vanuatu', flag: 'vu', text: 'Vanuatu' },
  { key: 'va', value: 'Vatican City', flag: 'va', text: 'Vatican City' },
  { key: 've', value: 'Venezuela', flag: 've', text: 'Venezuela' },
  { key: 'vn', value: 'Vietnam', flag: 'vn', text: 'Vietnam' },
  { key: 'wf', value: 'Wallis and Futuna', flag: 'wf', text: 'Wallis and Futuna' },
  { key: 'eh', value: 'Western Sahara', flag: 'eh', text: 'Western Sahara' },
  { key: 'ye', value: 'Yemen', flag: 'ye', text: 'Yemen' },
  { key: 'zm', value: 'Zambia', flag: 'zm', text: 'Zambia' },
  { key: 'zw', value: 'Zimbabwe', flag: 'zw', text: 'Zimbabwe' },
]

export const skillsOptions = [
    { key: 'af', value: 'Skill 1', text: 'Skill 1' },
    { key: 'ax', value: 'Skill 2', text: 'Skill 2' },
    { key: 'al', value: 'Skill 3', text: 'Skill 3' },
    { key: 'dz', value: 'Skill 4', text: 'Skill 4' },
    { key: 'as', value: 'Skill 5', text: 'Skill 5' },
    { key: 'ad', value: 'Skill 6', text: 'Skill ' }
  ]