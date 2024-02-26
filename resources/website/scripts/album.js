var PASTRIES = (function(){

	var expose = {
	
	}, hide = {
		formatWithUnderscores: formatWithUnderscores,
		handleGetAllProducts: handleGetAllProducts,
		loadAllItems: loadAllItems,
		loadItemsByTag: loadItemsByTag,
		printItems: printItems,
		setUpHandlers: setUpHandlers,
		showAll: showAll,
		showOnOffer: showOnOffer
	};

	(function init(){
		setUpHandlers();
		showOnOffer();
	})();

	function formatWithUnderscores(str){
		return str.replace(/ /g, "_");
	}
	function handleGetAllProducts(a, b, c){
		// debugger; //todo
		printItems("todo");
	}

	function loadAllItems(){
		$("[data-role='browse_album_content'] > section").remove();
		if(window.SONGLIST_CONFIG.API_GW_BASE_URL_STR === null){
			$.get("all_products.json", printItems);
		}else{
			$.get(window.SONGLIST_CONFIG.API_GW_BASE_URL_STR + "/products", printItems);
		}
	}

	function loadItemsByTag(){
		$("[data-role='browse_album_content'] > section").remove();
		var tag_name_str = "on_offer";
		if(window.SONGLIST_CONFIG.API_GW_BASE_URL_STR === null){
			$.get("all_products_" + tag_name_str + ".json", printItems);
		}else{
			$.get(window.SONGLIST_CONFIG.API_GW_BASE_URL_STR + "/products/" + tag_name_str, printItems);
		}
	}

	function printItems(response){
		var html_str = '';
		html_str += '<section class="flex-grid">';
		if(response.product_item_arr){
			for(var i_int = 0, o = {}; i_int < response.product_item_arr.length; i_int += 1){
				o = response.product_item_arr[i_int];

				html_str += '<div data-product_id="' + o. product_id_str + '">';
				
				for(var k_int = 0; k_int < o.tag_str_arr.length; k_int += 1){
					if(o.tag_str_arr[k_int] === "on offer"){
						html_str += '<div class="on_offer">sale</div>';
					}
					if(o.tag_str_arr[k_int] === "album"){
						html_str += '<div class="album">album</div>';
					}
				}

				html_str += 	'<h3>';
				html_str += 		o.product_name_str;
				html_str += 	'</h3>';
				html_str += 	'<h4>$' + (o.price_in_cents_int/100).toFixed(2) + '</h4>';
				html_str += 	'<section>';
				html_str += 	'<span>';
				html_str += 		o.description_str;
				html_str += 	'</span>';
			
				html_str += 	'</section>';
				// html_str += 	'<figure>';
				html_str += 	'<img src="images/album/' + formatWithUnderscores(o.product_name_str) + '.png" alt="Image for our ' + o.product_name_str + '" />';
				// html_str += 	'<span data-action="show_description">';
				// html_str += 		o.description_str;
				// html_str += 	'</span>';
				// html_str += 	'</figure>';
				html_str += '</div>';
			}
		}
		html_str += '</section>';
		$("[data-role='album']").text("");
		$("[data-role='browse_album_content']")
				.append(html_str);
	}

	function setUpHandlers(){
		$(document).on("click", "[data-action='show_all'][data-selected='not_selected']", showAll);
		$(document).on("click", "[data-action='show_on_offer'][data-selected='not_selected']", showOnOffer);
		// $(document).on("click", "[data-action='show_description']", toggleDescription);
	}

	function showAll(){
		$("[data-role='album']").text("Searching for IZ*ONE Album ...");
		$("[data-action='show_all']").attr("data-selected", "selected");
		$("[data-action='show_on_offer']").attr("data-selected", "not_selected");
		loadAllItems();
	}

	function showOnOffer(){
		$("[data-role='album']").text("Searching for IZ*ONE Album...");
		$("[data-action='show_all']").attr("data-selected", "not_selected");
		$("[data-action='show_on_offer']").attr("data-selected", "selected");
		loadItemsByTag();
	}

	// function toggleDescription(){
	// 	var $card_el = $(this)
	// 			.parent()
	// 			.parent();
	// 	if($card_el.attr("data-showing-description") === "showing"){
	// 		$card_el.attr("data-showing-description", "not_showing");
	// 	}else{
	// 		$card_el.attr("data-showing-description", "showing");
	// 	}
	// }

	return expose;

})();