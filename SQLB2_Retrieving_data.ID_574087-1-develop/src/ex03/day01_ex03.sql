select order_date as action_date, person_id
from person_order
intersect all
select visit_date, person_id
from person_visits
order by 1 ,2 desc