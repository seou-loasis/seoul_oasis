frappe.ui.form.on('Address', {
    onload: function (frm) {
        //to getting document's previous route
        prev_route = frappe.get_prev_route();
        prev_doctype = prev_route[1];
        prev_docname = prev_route[2];
        prev_doc = frappe.get_doc(prev_doctype, prev_docname);

        if(prev_doc.doctype === "Subsidiary"){
            var links = cur_frm.add_child("links")
            links.link_doctype = prev_doc.doctype,
            links.link_name = prev_doc.name
        }
    },
    
});