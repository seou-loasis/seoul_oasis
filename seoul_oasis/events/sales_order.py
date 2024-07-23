import frappe

@frappe.whitelist()
def get_sales_person_for_user():
    user = frappe.session.user
    sales_person = frappe.get_all('Sales Person', filters={'custom_user': user}, fields=['name'])
    return sales_person


@frappe.whitelist()
def get_last_selling_price(item_code, customer):
    if not (frappe.has_permission('Sales Invoice', 'read')):
        frappe.log_error(frappe._("User does not have permission to read Sales Invoice"), frappe.PermissionError)
        return 0

    last_price = frappe.db.sql("""
        SELECT sii.rate
        FROM `tabSales Invoice Item` sii
        JOIN `tabSales Invoice` si ON sii.parent = si.name
        WHERE sii.item_code = %s AND si.customer = %s AND si.docstatus = 1
        ORDER BY si.posting_date DESC, si.modified DESC
        LIMIT 1
    """, (item_code, customer))

    return last_price[0][0] if last_price else 0


