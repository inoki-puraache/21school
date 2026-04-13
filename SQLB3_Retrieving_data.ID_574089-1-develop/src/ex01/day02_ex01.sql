select g::date  as missing_date
from (select * from person_visits po where person_id in (1,2)) as po right join
generate_series('2022-01-01','2022-01-10', interval '1 day') as g on po.visit_date =g
where po.id is null
order by 1
