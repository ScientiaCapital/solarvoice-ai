# solaredge\_interface.api.SolarEdgeAPI [\#](https://solaredge-interface.readthedocs.io/en/latest/docs/python-modules/solaredgeapi/#solaredge_interfaceapisolaredgeapi)

###### [***\[view source\]***](https://github.com/ndejong/solaredge-interface/blob/f209a133292d804a3a00a24c8b21f8b99be680cf/src/solaredge_interface/api/SolarEdgeAPI.py#L2) **[\#](https://solaredge-interface.readthedocs.io/en/latest/docs/python-modules/solaredgeapi/#view-sourcehttpsgithubcomndejongsolaredge-interfaceblobf209a133292d804a3a00a24c8b21f8b99be680cfsrcsolaredge_interfaceapisolaredgeapipyl2)**

## SolarEdgeAPI [\#](https://solaredge-interface.readthedocs.io/en/latest/docs/python-modules/solaredgeapi/#solaredgeapi)

`class SolarEdgeAPI()`

###### [***\[view source\]***](https://github.com/ndejong/solaredge-interface/blob/f209a133292d804a3a00a24c8b21f8b99be680cf/src/solaredge_interface/api/SolarEdgeAPI.py#L18) **[\#](https://solaredge-interface.readthedocs.io/en/latest/docs/python-modules/solaredgeapi/#view-sourcehttpsgithubcomndejongsolaredge-interfaceblobf209a133292d804a3a00a24c8b21f8b99be680cfsrcsolaredge_interfaceapisolaredgeapipyl18)**

This class implements Python3 interfaces to the documented SolarEdge API end-points. Refer to [se\_monitoring\_api.pdf](https://www.solaredge.com/sites/default/files/se_monitoring_api.pdf) for more details on the SolarEdge API.

### \_\_init\_\_ [\#](https://solaredge-interface.readthedocs.io/en/latest/docs/python-modules/solaredgeapi/#__init__)

`| def __init__(api_key, datetime_response=False, pandas_response=False)`

###### [***\[view source\]***](https://github.com/ndejong/solaredge-interface/blob/f209a133292d804a3a00a24c8b21f8b99be680cf/src/solaredge_interface/api/SolarEdgeAPI.py#L29) **[\#](https://solaredge-interface.readthedocs.io/en/latest/docs/python-modules/solaredgeapi/#view-sourcehttpsgithubcomndejongsolaredge-interfaceblobf209a133292d804a3a00a24c8b21f8b99be680cfsrcsolaredge_interfaceapisolaredgeapipyl29)**

To call the SolarEdge API you need a valid `api_key` which can be obtained from your SolarEdge account.

*parameters*

* *api\_key* (str) required \- a valid api\_key from [https://monitoring.solaredge.com](https://monitoring.solaredge.com/)  
* *datetime\_response* (bool) default: False \- if True then parse all fields with a date or datetime string and convert them into timezone aware Python datetime objects.  
* *pandas\_response* (bool) default: False \- if True then parse response data and flatten into Pandas DataFrame and make available in the `.pandas` response attribute

### get\_accounts [\#](https://solaredge-interface.readthedocs.io/en/latest/docs/python-modules/solaredgeapi/#get_accounts)

`| def get_accounts(size=100, start_index=0, search_text="", sort_property="", sort_order="ASC")`

###### [***\[view source\]***](https://github.com/ndejong/solaredge-interface/blob/f209a133292d804a3a00a24c8b21f8b99be680cf/src/solaredge_interface/api/SolarEdgeAPI.py#L47) **[\#](https://solaredge-interface.readthedocs.io/en/latest/docs/python-modules/solaredgeapi/#view-sourcehttpsgithubcomndejongsolaredge-interfaceblobf209a133292d804a3a00a24c8b21f8b99be680cfsrcsolaredge_interfaceapisolaredgeapipyl47)**

Returns a list of sub-accounts (if available) that are accessible by the `api_key` with an ability to search and filter the results.

NB: `api_key` that do not have access to sub-accounts will return a “not authorized” response.

*parameters*

* *size* (int) default: `100` \- The maximum number of accounts returned by this call. The maximum number of accounts that can be returned by this call is 100\. If you have more than 100 accounts, just request another 100 accounts with startIndex=100 which will fetch accounts 100-199.  
* *start\_index* (int) default: `0` \- The first account index to be returned in the results.  
* *search\_text* (str) default: \- The search text for accounts. Searchable accounts properties: Name, Notes, Email, Country, State, City, Zip, Full address  
* *sort\_property* (str) default: \- A sorting option for this account list, based on one of its properties. Available sort properties: Name, country, city, Address, zip, fax, phone, notes  
* *sort\_order* (str) default: `ASC` \- Sort order for the sort property. Allowed values are ASC (ascending) and DESC (descending)

Uses Least-Recently-Used caching strategy to reduce calls to API backend and speed re-occurring function calls.

### get\_sites [\#](https://solaredge-interface.readthedocs.io/en/latest/docs/python-modules/solaredgeapi/#get_sites)

`| def get_sites(size=100, start_index=0, search_text="", sort_property="", sort_order="ASC", status="Active,Pending")`

###### [***\[view source\]***](https://github.com/ndejong/solaredge-interface/blob/f209a133292d804a3a00a24c8b21f8b99be680cf/src/solaredge_interface/api/SolarEdgeAPI.py#L82) **[\#](https://solaredge-interface.readthedocs.io/en/latest/docs/python-modules/solaredgeapi/#view-sourcehttpsgithubcomndejongsolaredge-interfaceblobf209a133292d804a3a00a24c8b21f8b99be680cfsrcsolaredge_interfaceapisolaredgeapipyl82)**

Returns the sites accessible by the `api_key` with an ability to search and filter.

*parameters*

* *size* (int) default: `100` \- The maximum number of sites returned by this call. The maximum number of sites that can be returned by this call is 100\. If you have more than 100 sites, just request another 100 sites with startIndex=100 which will fetch sites 100-199.  
* *start\_index* (int) default: `0` \- The first site index to be returned in the results.  
* *search\_text* (str) default: \- The search text for sites. Searchable site properties: Name, Notes, Address, City, Zip code, Full address, Country  
* *sort\_property* (str) default: \- A sorting option for this site list, based on one of its properties. Available sort properties: Name, Country, State, City, Address, Zip, Status, PeakPower, InstallationDate, Amount, MaxSeverity, CreationTime  
* *sort\_order* (str) default: `ASC` \- Sort order for the sort property. Allowed values are ASC (ascending) and DESC (descending)  
* *status* (str) default: `Active,Pending` \- Select the sites to be included in the list by their status: Active, Pending, Disabled, All.

Uses Least-Recently-Used caching strategy to reduce calls to API backend and speed re-occurring function calls.

### get\_site\_details [\#](https://solaredge-interface.readthedocs.io/en/latest/docs/python-modules/solaredgeapi/#get_site_details)

`| def get_site_details(site_id)`

###### [***\[view source\]***](https://github.com/ndejong/solaredge-interface/blob/f209a133292d804a3a00a24c8b21f8b99be680cf/src/solaredge_interface/api/SolarEdgeAPI.py#L118) **[\#](https://solaredge-interface.readthedocs.io/en/latest/docs/python-modules/solaredgeapi/#view-sourcehttpsgithubcomndejongsolaredge-interfaceblobf209a133292d804a3a00a24c8b21f8b99be680cfsrcsolaredge_interfaceapisolaredgeapipyl118)**

Returns site details for `site_id` such as name, location, status, etc.

*parameters*

* *site\_id* (int) required \- The site identifier to retrieve data for.

Uses Least-Recently-Used caching strategy to reduce calls to API backend and speed re-occurring function calls.

### get\_site\_timezone [\#](https://solaredge-interface.readthedocs.io/en/latest/docs/python-modules/solaredgeapi/#get_site_timezone)

`| def get_site_timezone(site_id, tempfile_cache_use=True)`

###### [***\[view source\]***](https://github.com/ndejong/solaredge-interface/blob/f209a133292d804a3a00a24c8b21f8b99be680cf/src/solaredge_interface/api/SolarEdgeAPI.py#L134) **[\#](https://solaredge-interface.readthedocs.io/en/latest/docs/python-modules/solaredgeapi/#view-sourcehttpsgithubcomndejongsolaredge-interfaceblobf209a133292d804a3a00a24c8b21f8b99be680cfsrcsolaredge_interfaceapisolaredgeapipyl134)**

Returns site timezone for `site_id` \- returns from local tempfile cache to prevent repeated requests. This function is provided as a convenience.

*parameters*

* *site\_id* (int) required \- The site identifier to retrieve data for.

Uses Least-Recently-Used caching strategy to reduce calls to API backend and speed re-occurring function calls.

### get\_site\_data\_period [\#](https://solaredge-interface.readthedocs.io/en/latest/docs/python-modules/solaredgeapi/#get_site_data_period)

`| def get_site_data_period(site_id)`

###### [***\[view source\]***](https://github.com/ndejong/solaredge-interface/blob/f209a133292d804a3a00a24c8b21f8b99be680cf/src/solaredge_interface/api/SolarEdgeAPI.py#L167) **[\#](https://solaredge-interface.readthedocs.io/en/latest/docs/python-modules/solaredgeapi/#view-sourcehttpsgithubcomndejongsolaredge-interfaceblobf209a133292d804a3a00a24c8b21f8b99be680cfsrcsolaredge_interfaceapisolaredgeapipyl167)**

Returns the start-date and end-date of energy production at the site(s).

*parameters*

* *site\_id* (int or list) required \- The site identifier(s) to retrieve data for, may be provided as a single int value or a list of int values to retrieve data in “bulk-mode”

Uses Least-Recently-Used caching strategy to reduce calls to API backend and speed re-occurring function calls.

### get\_site\_energy [\#](https://solaredge-interface.readthedocs.io/en/latest/docs/python-modules/solaredgeapi/#get_site_energy)

`| def get_site_energy(site_id, start_date, end_date, time_unit="DAY")`

###### [***\[view source\]***](https://github.com/ndejong/solaredge-interface/blob/f209a133292d804a3a00a24c8b21f8b99be680cf/src/solaredge_interface/api/SolarEdgeAPI.py#L183) **[\#](https://solaredge-interface.readthedocs.io/en/latest/docs/python-modules/solaredgeapi/#view-sourcehttpsgithubcomndejongsolaredge-interfaceblobf209a133292d804a3a00a24c8b21f8b99be680cfsrcsolaredge_interfaceapisolaredgeapipyl183)**

Returns the site(s) energy measurements.

NB: the time input parameters required are date values in the format YYYY-MM-DD not full timestamp values.

*parameters*

* *site\_id* (int or list) required \- The site identifier(s) to retrieve data for, may be provided as a single int value or a list of int values to retrieve data in “bulk-mode”  
* *start\_date* (str) required \- must be in format YYYY-MM-DD  
* *end\_date* (str) required \- must be in format YYYY-MM-DD  
* *time\_unit* (str) default: `DAY` \- Permitted values are: QUARTER\_OF\_AN\_HOUR, HOUR, DAY, WEEK, MONTH, YEAR

### get\_site\_time\_frame\_energy [\#](https://solaredge-interface.readthedocs.io/en/latest/docs/python-modules/solaredgeapi/#get_site_time_frame_energy)

`| def get_site_time_frame_energy(site_id, start_date, end_date)`

###### [***\[view source\]***](https://github.com/ndejong/solaredge-interface/blob/f209a133292d804a3a00a24c8b21f8b99be680cf/src/solaredge_interface/api/SolarEdgeAPI.py#L205) **[\#](https://solaredge-interface.readthedocs.io/en/latest/docs/python-modules/solaredgeapi/#view-sourcehttpsgithubcomndejongsolaredge-interfaceblobf209a133292d804a3a00a24c8b21f8b99be680cfsrcsolaredge_interfaceapisolaredgeapipyl205)**

Return the site(s) total energy produced for a given date period.

NB: the time input parameters required are date values in the format YYYY-MM-DD not full timestamp values.

*parameters*

* *site\_id* (int or list) required \- The site identifier(s) to retrieve data for, may be provided as a single int value or a list of int values to retrieve data in “bulk-mode”  
* *start\_date* (str) required \- must be in format YYYY-MM-DD  
* *end\_date* (str) required \- must be in format YYYY-MM-DD

### get\_site\_overview [\#](https://solaredge-interface.readthedocs.io/en/latest/docs/python-modules/solaredgeapi/#get_site_overview)

`| def get_site_overview(site_id)`

###### [***\[view source\]***](https://github.com/ndejong/solaredge-interface/blob/f209a133292d804a3a00a24c8b21f8b99be680cf/src/solaredge_interface/api/SolarEdgeAPI.py#L225) **[\#](https://solaredge-interface.readthedocs.io/en/latest/docs/python-modules/solaredgeapi/#view-sourcehttpsgithubcomndejongsolaredge-interfaceblobf209a133292d804a3a00a24c8b21f8b99be680cfsrcsolaredge_interfaceapisolaredgeapipyl225)**

Return the site(s) overview data.

*parameters*

* *site\_id* (int or list) required \- The site identifier(s) to retrieve data for, may be provided as a single int value or a list of int values to retrieve data in “bulk-mode”

### get\_site\_power [\#](https://solaredge-interface.readthedocs.io/en/latest/docs/python-modules/solaredgeapi/#get_site_power)

`| def get_site_power(site_id, start_time, end_time)`

###### [***\[view source\]***](https://github.com/ndejong/solaredge-interface/blob/f209a133292d804a3a00a24c8b21f8b99be680cf/src/solaredge_interface/api/SolarEdgeAPI.py#L239) **[\#](https://solaredge-interface.readthedocs.io/en/latest/docs/python-modules/solaredgeapi/#view-sourcehttpsgithubcomndejongsolaredge-interfaceblobf209a133292d804a3a00a24c8b21f8b99be680cfsrcsolaredge_interfaceapisolaredgeapipyl239)**

Return the site(s) power measurements in 15 minute resolution.

*parameters*

* *site\_id* (int or list) required \- The site identifier(s) to retrieve data for, may be provided as a single int value or a list of int values to retrieve data in “bulk-mode”  
* *start\_time* (str) required \- must be in format YYYY-MM-DD hh:mm:ss  
* *end\_time* (str) required \- must be in format YYYY-MM-DD hh:mm:ss

### get\_site\_power\_details [\#](https://solaredge-interface.readthedocs.io/en/latest/docs/python-modules/solaredgeapi/#get_site_power_details)

`| def get_site_power_details(site_id, start_time, end_time, meters=None)`

###### [***\[view source\]***](https://github.com/ndejong/solaredge-interface/blob/f209a133292d804a3a00a24c8b21f8b99be680cf/src/solaredge_interface/api/SolarEdgeAPI.py#L257) **[\#](https://solaredge-interface.readthedocs.io/en/latest/docs/python-modules/solaredgeapi/#view-sourcehttpsgithubcomndejongsolaredge-interfaceblobf209a133292d804a3a00a24c8b21f8b99be680cfsrcsolaredge_interfaceapisolaredgeapipyl257)**

Detailed site power measurements from meters such as consumption, export (feed-in), import (purchase), etc. Calculated meter readings (also referred to as “virtual meters”), such as self-consumption, are calculated using the data measured by the meter and the inverters.

*parameters*

* *site\_id* (int) required \- The site identifier to retrieve data for.  
* *start\_time* (str) required \- must be in format YYYY-MM-DD hh:mm:ss  
* *end\_time* (str) required \- must be in format YYYY-MM-DD hh:mm:ss  
* *meters* (str) default: \- If this value is omitted all meter readings are returned. The following values are permitted separated by comma: Production, Consumption, SelfConsumption, FeedIn, Purchased

### get\_site\_energy\_details [\#](https://solaredge-interface.readthedocs.io/en/latest/docs/python-modules/solaredgeapi/#get_site_energy_details)

`| def get_site_energy_details(site_id, start_time, end_time, meters=None, time_unit="DAY")`

###### [***\[view source\]***](https://github.com/ndejong/solaredge-interface/blob/f209a133292d804a3a00a24c8b21f8b99be680cf/src/solaredge_interface/api/SolarEdgeAPI.py#L280) **[\#](https://solaredge-interface.readthedocs.io/en/latest/docs/python-modules/solaredgeapi/#view-sourcehttpsgithubcomndejongsolaredge-interfaceblobf209a133292d804a3a00a24c8b21f8b99be680cfsrcsolaredge_interfaceapisolaredgeapipyl280)**

Detailed site energy measurements from meters such as consumption, export (feed-in), import (purchase), etc. Calculated meter readings (also referred to as “virtual meters”), such as self-consumption, are calculated using the data measured by the meter and the inverters.

*parameters*

* *site\_id* (int) required \- The site identifier to retrieve data for.  
* *start\_time* (str) required \- must be in format YYYY-MM-DD hh:mm:ss  
* *end\_time* (str) required \- must be in format YYYY-MM-DD hh:mm:ss  
* *meters* (str) default: None \- If this value is omitted all meter readings are returned. The following values are permitted separated by comma: Production, Consumption, SelfConsumption, FeedIn, Purchased  
* *time\_unit* (str) default: `DAY` \- Permitted values are: QUARTER\_OF\_AN\_HOUR, HOUR, DAY, WEEK, MONTH, YEAR

### get\_site\_current\_power\_flow [\#](https://solaredge-interface.readthedocs.io/en/latest/docs/python-modules/solaredgeapi/#get_site_current_power_flow)

`| def get_site_current_power_flow(site_id)`

###### [***\[view source\]***](https://github.com/ndejong/solaredge-interface/blob/f209a133292d804a3a00a24c8b21f8b99be680cf/src/solaredge_interface/api/SolarEdgeAPI.py#L305) **[\#](https://solaredge-interface.readthedocs.io/en/latest/docs/python-modules/solaredgeapi/#view-sourcehttpsgithubcomndejongsolaredge-interfaceblobf209a133292d804a3a00a24c8b21f8b99be680cfsrcsolaredge_interfaceapisolaredgeapipyl305)**

Provides the current power flow between all elements of the site including PV array, storage (battery), loads (consumption) and grid.

*parameters*

* *site\_id* (int) required \- The site identifier to retrieve data for.

### get\_site\_storage\_data [\#](https://solaredge-interface.readthedocs.io/en/latest/docs/python-modules/solaredgeapi/#get_site_storage_data)

`| def get_site_storage_data(site_id, start_time, end_time, serials=None)`

###### [***\[view source\]***](https://github.com/ndejong/solaredge-interface/blob/f209a133292d804a3a00a24c8b21f8b99be680cf/src/solaredge_interface/api/SolarEdgeAPI.py#L319) **[\#](https://solaredge-interface.readthedocs.io/en/latest/docs/python-modules/solaredgeapi/#view-sourcehttpsgithubcomndejongsolaredge-interfaceblobf209a133292d804a3a00a24c8b21f8b99be680cfsrcsolaredge_interfaceapisolaredgeapipyl319)**

Get detailed storage information from batteries:the state of energy, power and lifetime energy.

*parameters*

* *site\_id* (int) required \- The site identifier to retrieve data for.  
* *start\_time* (str) required \- must be in format YYYY-MM-DD hh:mm:ss  
* *end\_time* (str) required \- must be in format YYYY-MM-DD hh:mm:ss  
* *serials* (list) default: None \- Return data only for specific battery serial numbers; If omitted, the response includes all the batteries at the site.

### get\_site\_environmental\_benefits [\#](https://solaredge-interface.readthedocs.io/en/latest/docs/python-modules/solaredgeapi/#get_site_environmental_benefits)

`| def get_site_environmental_benefits(site_id, system_units=None)`

###### [***\[view source\]***](https://github.com/ndejong/solaredge-interface/blob/f209a133292d804a3a00a24c8b21f8b99be680cf/src/solaredge_interface/api/SolarEdgeAPI.py#L346) **[\#](https://solaredge-interface.readthedocs.io/en/latest/docs/python-modules/solaredgeapi/#view-sourcehttpsgithubcomndejongsolaredge-interfaceblobf209a133292d804a3a00a24c8b21f8b99be680cfsrcsolaredge_interfaceapisolaredgeapipyl346)**

Get all environmental benefits based on site energy production:CO2 emissions saved, equivalent trees planted, and light bulbs powered for a day.

*parameters*

* *site\_id* (int) required \- The site identifier to retrieve data for.  
* *system\_units* (str) default: None \- The system units used when returning gas emission savings. Valid values: `Metrics`, `Imperial` note these values are case sensitive. If system\_units is not specified, the user system units are used.

### get\_site\_inventory [\#](https://solaredge-interface.readthedocs.io/en/latest/docs/python-modules/solaredgeapi/#get_site_inventory)

`| def get_site_inventory(site_id)`

###### [***\[view source\]***](https://github.com/ndejong/solaredge-interface/blob/f209a133292d804a3a00a24c8b21f8b99be680cf/src/solaredge_interface/api/SolarEdgeAPI.py#L369) **[\#](https://solaredge-interface.readthedocs.io/en/latest/docs/python-modules/solaredgeapi/#view-sourcehttpsgithubcomndejongsolaredge-interfaceblobf209a133292d804a3a00a24c8b21f8b99be680cfsrcsolaredge_interfaceapisolaredgeapipyl369)**

Get the inventory of SolarEdge equipment at the site, including inverters/SMIs, batteries, meters, gateways and sensors.

*parameters*

* *site\_id* (int) required \- The site identifier to retrieve data for.

Uses Least-Recently-Used caching strategy to reduce calls to API backend and speed re-occurring function calls.

### get\_site\_equipment\_data [\#](https://solaredge-interface.readthedocs.io/en/latest/docs/python-modules/solaredgeapi/#get_site_equipment_data)

`| def get_site_equipment_data(site_id, start_time, end_time, serial_number)`

###### [***\[view source\]***](https://github.com/ndejong/solaredge-interface/blob/f209a133292d804a3a00a24c8b21f8b99be680cf/src/solaredge_interface/api/SolarEdgeAPI.py#L385) **[\#](https://solaredge-interface.readthedocs.io/en/latest/docs/python-modules/solaredgeapi/#view-sourcehttpsgithubcomndejongsolaredge-interfaceblobf209a133292d804a3a00a24c8b21f8b99be680cfsrcsolaredge_interfaceapisolaredgeapipyl385)**

Get specific inverter data for a given timeframe.

*parameters*

* *site\_id* (int) required \- The site identifier to retrieve data for.  
* *start\_time* (str) required \- must be in format YYYY-MM-DD hh:mm:ss  
* *end\_time* (str) required \- must be in format YYYY-MM-DD hh:mm:ss  
* *serial\_number* (str) required \- The inverter short serial number, eg 12345678-90

### get\_site\_equipment\_change\_log [\#](https://solaredge-interface.readthedocs.io/en/latest/docs/python-modules/solaredgeapi/#get_site_equipment_change_log)

`| def get_site_equipment_change_log(site_id, serial_number)`

###### [***\[view source\]***](https://github.com/ndejong/solaredge-interface/blob/f209a133292d804a3a00a24c8b21f8b99be680cf/src/solaredge_interface/api/SolarEdgeAPI.py#L403) **[\#](https://solaredge-interface.readthedocs.io/en/latest/docs/python-modules/solaredgeapi/#view-sourcehttpsgithubcomndejongsolaredge-interfaceblobf209a133292d804a3a00a24c8b21f8b99be680cfsrcsolaredge_interfaceapisolaredgeapipyl403)**

Returns a list of equipment component replacements ordered by date. This method is applicable to inverters, optimizers, batteries and gateways.

*parameters*

* *site\_id* (int) required \- The site identifier to retrieve data for.  
* *serial\_number* (str) required \- Inverter, battery, optimizer or gateway short serial number.

### get\_site\_meters [\#](https://solaredge-interface.readthedocs.io/en/latest/docs/python-modules/solaredgeapi/#get_site_meters)

`| def get_site_meters(site_id, start_time, end_time, meters=None)`

###### [***\[view source\]***](https://github.com/ndejong/solaredge-interface/blob/f209a133292d804a3a00a24c8b21f8b99be680cf/src/solaredge_interface/api/SolarEdgeAPI.py#L418) **[\#](https://solaredge-interface.readthedocs.io/en/latest/docs/python-modules/solaredgeapi/#view-sourcehttpsgithubcomndejongsolaredge-interfaceblobf209a133292d804a3a00a24c8b21f8b99be680cfsrcsolaredge_interfaceapisolaredgeapipyl418)**

Returns for each meter on site its lifetime energy reading, metadata and the device to which it is connected.

*parameters*

* *site\_id* (int) required \- The site identifier to retrieve data for.  
* *start\_time* (str) required \- must be in format YYYY-MM-DD hh:mm:ss  
* *end\_time* (str) required \- must be in format YYYY-MM-DD hh:mm:ss  
* *meters* (str ot list) default: None \- Select specific meters only. If this value is omitted, all meter readings are returned. Valid values: Production, Consumption, FeedIn, Purchased.

### get\_site\_equipment\_sensors [\#](https://solaredge-interface.readthedocs.io/en/latest/docs/python-modules/solaredgeapi/#get_site_equipment_sensors)

`| def get_site_equipment_sensors(site_id)`

###### [***\[view source\]***](https://github.com/ndejong/solaredge-interface/blob/f209a133292d804a3a00a24c8b21f8b99be680cf/src/solaredge_interface/api/SolarEdgeAPI.py#L440) **[\#](https://solaredge-interface.readthedocs.io/en/latest/docs/python-modules/solaredgeapi/#view-sourcehttpsgithubcomndejongsolaredge-interfaceblobf209a133292d804a3a00a24c8b21f8b99be680cfsrcsolaredge_interfaceapisolaredgeapipyl440)**

Returns a list of all the sensors in the site, and the device to which they are connected.

*parameters*

* *site\_id* (int) required \- The site identifier to retrieve data for.

### get\_version\_current [\#](https://solaredge-interface.readthedocs.io/en/latest/docs/python-modules/solaredgeapi/#get_version_current)

`| def get_version_current()`

###### [***\[view source\]***](https://github.com/ndejong/solaredge-interface/blob/f209a133292d804a3a00a24c8b21f8b99be680cf/src/solaredge_interface/api/SolarEdgeAPI.py#L453) **[\#](https://solaredge-interface.readthedocs.io/en/latest/docs/python-modules/solaredgeapi/#view-sourcehttpsgithubcomndejongsolaredge-interfaceblobf209a133292d804a3a00a24c8b21f8b99be680cfsrcsolaredge_interfaceapisolaredgeapipyl453)**

Return the most updated version number in \<major.minor.revision\> format.

### get\_version\_supported [\#](https://solaredge-interface.readthedocs.io/en/latest/docs/python-modules/solaredgeapi/#get_version_supported)

`| def get_version_supported()`

###### [***\[view source\]***](https://github.com/ndejong/solaredge-interface/blob/f209a133292d804a3a00a24c8b21f8b99be680cf/src/solaredge_interface/api/SolarEdgeAPI.py#L463) **[\#](https://solaredge-interface.readthedocs.io/en/latest/docs/python-modules/solaredgeapi/#view-sourcehttpsgithubcomndejongsolaredge-interfaceblobf209a133292d804a3a00a24c8b21f8b99be680cfsrcsolaredge_interfaceapisolaredgeapipyl463)**

Return a list of supported version numbers in \<major.minor.revision\> format

[AI-powered ad network for devs. Get your message in front of the right developers with EthicalAds.](https://server.ethicalads.io/proxy/click/8170/0197d1c8-af24-7ba0-9647-86c32bb7d1a9/)

[*Ads by EthicalAds*](https://www.ethicalads.io/advertisers/topics/backend-web/?ref=ea-text)

