select order_date,
name || '(age:'||age||')' as person_information
from person_order inner join person p on p.id = person_order.person_id
order by 1,2;