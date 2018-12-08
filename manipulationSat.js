async function callAjax(country,sector,service){
	let res = await jQuery.post('/partners/search-for-partner/',{select_country:country, search_str:'',
				select_sector: sector,
				select_service: service,
				filter_search:''});
	return jQuery('<body>'+res.split("</form>")[1].split('</footer>')[0]+'</footer></body>')
}

function trans(i,k=0,j=0){
	country = jQuery(`#select_country_${i}`).text(),
	sector = jQuery(`#select_sector_${k}`).text(),
	service = jQuery(`#select_service_${j}`).text()
	return callAjax(country, sector, service).then((elm)=>{return {country, sector, service,
		resultNum: elm.find('.pag_row').length,
		names: jQuery.map(elm.find('h3.partner'), function( val, i ) {
						return val.innerText})
	}})
}

var allList =[];
let countryOptionsLength= jQuery("#select_country_option_box p").length;
for (i = 1; i < countryOptionsLength; i++) {
	allList.push(await trans(i));
}

//all countries that have data
let count = 0;
let countriesData = allList.filter(i=>{count+=i.resultNum;return i.resultNum});
console.log(`all partners count ${count}`);
