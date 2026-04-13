select order_date,
name || '(age:'||age||')' as person_information
from person_order natural join (select p.id as person_id, name, age FROM person p) as p
order by 1,2;