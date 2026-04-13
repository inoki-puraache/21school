select p.name as person_name,
m.pizza_name as pizza_name,
pz.name as pizzeria_name
from person_order po inner join person p on p.id = po.person_id
inner join menu m on m.id = po.menu_id
inner join pizzeria pz on m.pizzeria_id = pz.id
order by 1,2,3;