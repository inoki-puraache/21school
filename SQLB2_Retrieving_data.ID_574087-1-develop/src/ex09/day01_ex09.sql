-- select name
-- from pizzeria
-- where id not in (select pizzeria_id from person_visits)

select name
from pizzeria 
where not exists (select 1 from person_visits pv where pv.pizzeria_id = pizzeria.id)