// Copyright (c) 2024, Craft Interactive and contributors
// For license information, please see license.txt


// frappe.ui.form.on('Subsidiary', {
// 	setup: function(frm) {
// 		frm.set_query('address', function(doc) {
// 			// if(!doc.subsidiary) {
// 			// 	frappe.throw(__('Please set Company'));
// 			// }

// 			return {
// 				query: 'frappe.contacts.doctype.address.address.address_query',
// 				filters: {
// 					link_doctype: 'Subsidiary',
// 					link_name: frm.doc.name
// 				}
// 			};
// 		});
// 	},
// 	address: function(frm){
// 		if(frm.doc.address){
// 			frappe.call({
// 				method: 'frappe.contacts.doctype.address.address.get_address_display',
// 				args: {
// 					"address_dict": frm.doc.address
// 				},
// 				callback: function(r) {
// 					console.log(r.message)
// 					frm.set_value("primary_address", r.message);
// 				}
// 			});
// 		}
		
//         },
// });


