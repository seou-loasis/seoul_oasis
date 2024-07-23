frappe.ui.form.on('Sales Order Item', {
    item_code: function(frm, cdt, cdn) {
        let row = locals[cdt][cdn];
        if (row.item_code) {
            frappe.call({
                method: 'frappe.client.get',
                args: {
                    doctype: 'Item',
                    name: row.item_code
                },
                callback: function(data) {
                    if (data.message) {
                        let uom_list = data.message.uoms.map(uom => uom.uom);

                        frm.fields_dict['items'].grid.get_field('uom').get_query = function() {
                            return {
                                filters: [
                                    ['UOM', 'name', 'in', uom_list]
                                ]
                            };
                        };
                    }
                }
            });
        } else {
            frm.fields_dict['items'].grid.get_field('uom').get_query = function() {
                return {};
            };
        }
    }
});




frappe.ui.form.on('Sales Order Item', {
    item_code: function (frm, cdt, cdn) {
        let item = locals[cdt][cdn];
        if (item.item_code) {
            frappe.call({
                method: 'seoul_oasis.events.sales_order.get_last_selling_price',
                args: {
                    item_code: item.item_code,
                    customer: frm.doc.customer
                },
                callback: function (r) {
                    if (r.message) {
                        frappe.model.set_value(cdt, cdn, 'custom_last_selling_price', r.message);
                    } else {
                        frappe.model.set_value(cdt, cdn, 'custom_last_selling_price', 0);
                    }
                }
            });
        }
    }
});


function set_sales_person(frm) {
    if (frm.is_new()) {
        frappe.call({
            method: 'seoul_oasis.events.sales_order.get_sales_person_for_user',
            callback: function(r) {
                if (r.message && r.message.length > 0) {
                    let sales_person_name = r.message[0].name;

                    frm.set_value('sales_team', []);
                    let new_row = frm.add_child('sales_team');
                    new_row.sales_person = sales_person_name;
                    new_row.allocated_percentage = 100;

                    frm.refresh_field('sales_team');
                }
            }
        });
    }
}

frappe.ui.form.on('Sales Order', {
    onload: function(frm) {
        set_sales_person(frm);
    },
    before_save: function(frm) {
        set_sales_person(frm);
    }
});
