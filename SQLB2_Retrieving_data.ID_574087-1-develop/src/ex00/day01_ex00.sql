select id as objectc_id, pizza_name as objectc_id
from menu
union
select id, name 
from person
order
by 1,2;
