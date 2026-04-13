select action_date, person.name as person_name
from (select order_date as action_date, person_id
from person_order
intersect all
select visit_date, person_id
from person_visits) as t1
inner join person on t1.person_id = person.id
order by 1,2 desc