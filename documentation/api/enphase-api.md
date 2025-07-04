# Documentation

**Note:** Both Monitoring and Commissioning API follow OAuth 2.0 authentication. Each API request should include an OAuth 2.0 access token as Authorization header using the Bearer scheme, and the request should also include the API key of your application in header with name 'key'.

 

## Monitoring API

**Schemeshttps**

### System Details

**GET**

/api/v4/systems

Fetch systems

**POST**

/api/v4/systems/search

Search and filter systems

**GET**

/api/v4/systems/{system\_id}

Retrieves a System by id

**GET**

/api/v4/systems/{system\_id}/summary

Retrieves a system summary

**GET**

/api/v4/systems/{system\_id}/devices

Retrieves devices for a given system

**GET**

/api/v4/systems/retrieve\_system\_id

Retrieve system for a given envoy serial number

**GET**

/api/v4/systems/inverters\_summary\_by\_envoy\_or\_site

inverters\_summary\_by\_envoy\_or\_site

### Site Level Production Monitoring

**GET**

/api/v4/systems/{system\_id}/production\_meter\_readings

production\_meter\_readings

**GET**

/api/v4/systems/{system\_id}/rgm\_stats

rgm\_stats

**GET**

/api/v4/systems/{system\_id}/energy\_lifetime

energy\_lifetime

**GET**

/api/v4/systems/{system\_id}/telemetry/production\_micro

Retrieves telemetry for all production micros for a system

**GET**

/api/v4/systems/{system\_id}/telemetry/production\_meter

Retrieves telemetry for all production meters for a system

### Site Level Consumption Monitoring

**GET**

/api/v4/systems/{system\_id}/consumption\_lifetime

consumption\_lifetime

**GET**

/api/v4/systems/{system\_id}/battery\_lifetime

battery\_lifetime

**GET**

/api/v4/systems/{system\_id}/energy\_import\_lifetime

import\_lifetime

**GET**

/api/v4/systems/{system\_id}/energy\_export\_lifetime

export\_lifetime

**GET**

/api/v4/systems/{system\_id}/telemetry/battery

Retrieves telemetry for all batteries for a system

**GET**

/api/v4/systems/{system\_id}/telemetry/consumption\_meter

Retrieves telemetry for all consumption meters for a system

**GET**

/api/v4/systems/{system\_id}/energy\_import\_telemetry

Retrieves energy imported from grid in regular intervals

**GET**

/api/v4/systems/{system\_id}/energy\_export\_telemetry

Retrieves energy exported to grid in regular intervals

**GET**

/api/v4/systems/{system\_id}/latest\_telemetry

Returns a system's last reported PV Power, Consumption Power, and Battery Power in Watts.

### Device Level Production Monitoring

**GET**

/api/v4/systems/{system\_id}/devices/micros/{serial\_no}/telemetry

Retrieves telemetry for single micro/pcu.

**GET**

/api/v4/systems/{system\_id}/devices/acbs/{serial\_no}/telemetry

Retrieves telemetry for single ACB

**GET**

/api/v4/systems/{system\_id}/devices/encharges/{serial\_no}/telemetry

Retrieves telemetry for single Encharge

### System Configurations

**GET**

/api/v4/systems/config/{system\_id}/battery\_settings

Returns the current battery settings of a system

**PUT**

/api/v4/systems/config/{system\_id}/battery\_settings

Updates the current battery settings of a system

**GET**

/api/v4/systems/config/{system\_id}/storm\_guard

Returns the current storm guard settings of a system

**PUT**

/api/v4/systems/config/{system\_id}/storm\_guard

Updates the current storm guard settings of a system

**GET**

/api/v4/systems/config/{system\_id}/grid\_status

Returns the current grid status of a system

**GET**

/api/v4/systems/config/{system\_id}/load\_control

Returns the current load control settings of a system

**PUT**

/api/v4/systems/config/{system\_id}/load\_control

Updates the current load control settings of a system

### Streaming APIs

**GET**

/api/v4/systems/{system\_id}/live\_data

Site Level Live Status

### EV Charger Monitoring

**GET**

/api/v4/systems/{system\_id}/ev\_charger/devices

Fetch active chargers for a system

**GET**

/api/v4/systems/{system\_id}/ev\_charger/events

Fetch events

**GET**

/api/v4/systems/{system\_id}/ev\_charger/{serial\_no}/sessions

Charger session history

**GET**

/api/v4/systems/{system\_id}/ev\_charger/{serial\_no}/schedules

Get Schedule

**GET**

/api/v4/systems/{system\_id}/ev\_charger/{serial\_no}/lifetime

Daily energy api

**GET**

/api/v4/systems/{system\_id}/ev\_charger/{serial\_no}/telemetry

Interval energy api

### EV Charger Control

**POST**

/api/v4/systems/{system\_id}/ev\_charger/{serial\_no}/start\_charging

Start charging. Illustrative only \- access via VPP api for partners

**POST**

/api/v4/systems/{system\_id}/ev\_charger/{serial\_no}/stop\_charging

Stop charging. Illustrative only \- access via VPP api for partners

#### Models

ErrorResponse

ErrorResponseArray

DefaultCommandResponse

StartChargingRequestBody

EVIntervalEnergyResponse

EnergyConsumption

ChargeSessionDetail

ChargeSessionDetailsResponse

Schedule

ScheduleList

SchedulesBodyResponse

EVEnergyResponse

EVEventsResponse

EventDetail

ChargerSummary

ChargerSummaryResponse

## Commissioning API

**Schemeshttps**

### Activations

**GET**

/api/v4/activations/{activation\_id}/battery\_mode

API endpoint to get battery charge/discharge setting.

**PUT**

/api/v4/activations/{activation\_id}/battery\_mode

API endpoint to update battery charge/discharge setting.

**GET**

/api/v4/partner/activations

List of Activations

**POST**

/api/v4/partner/activations

Create new activation.

**GET**

/api/v4/partner/activations/{activation\_id}

Retrieves an Activation by id

**PUT**

/api/v4/partner/activations/{activation\_id}

Update an activation.

**DELETE**

/api/v4/partner/activations/{activation\_id}

Delete an activation by id

**POST**

/api/v4/activations/{activation\_id}/users/{user\_id}

Grant Access

**DELETE**

/api/v4/activations/{activation\_id}/users/{user\_id}

Revoke Access

**POST**

/api/v4/activations/{activation\_id}/ops/production\_mode

Set production mode

**GET**

/api/v4/activations/{activation\_id}/ops/production\_mode

Get production mode

### Users

**GET**

/api/v4/activations/{activation\_id}/users/{user\_id}

Returns the requested user

**PUT**

/api/v4/activations/{activation\_id}/users/{user\_id}

Update user

**GET**

/api/v4/users/search

Search user

**GET**

/api/v4/partner/users/{user\_id}

Returns the requested user

**PUT**

/api/v4/users/{user\_id}

Update user

**GET**

/api/v4/partner/users/self

Return the current logged in user detail

### Companies

**GET**

/api/v4/companies/{company\_id}/users

Get all users with in a company

**POST**

/api/v4/companies/{company\_id}/users

Create company user

**GET**

/api/v4/companies/{company\_id}/users/{user\_id}

Returns the requested user

**PUT**

/api/v4/companies/{company\_id}/users/{user\_id}

Update company user

**GET**

/api/v4/companies/self/branches

User's company and its branches

**GET**

/api/v4/companies/self/authorized\_subcontractors

User's company and its authorized subcontractors.

### Home Owner

**POST**

/api/v4/users

Create Home owner

### Estimate

**GET**

/api/v4/activations/{activation\_id}/estimate

Returns the estimate for this system.

**PUT**

/api/v4/activations/{activation\_id}/estimate

Update the estimate for this system.

### Grid Profiles

**GET**

/api/v4/partner/grid\_profiles

Lists the available profiles

### Meters

**GET**

/api/v4/systems/{system\_id}/meters/{serial\_number}

Returns the requested meter detail.

**PUT**

/api/v4/systems/{system\_id}/meters/{serial\_number}

Update the operational date of a meter by serial number.

**POST**

/api/v4/activations/{activation\_id}/meters/{serial\_number}/meter\_control

Enable or Disable the meters.

### PvManufacturers

**GET**

/api/v4/pv\_manufacturers

Returns PV module manufacturers

### PvModels

**GET**

/api/v4/pv\_manufacturers/{pv\_manufacturer\_id}/pv\_models

Returns PV module manufacturers

### Tariff

**GET**

/api/v4/systems/config/{system\_id}/tariff

Get tariff for a system

**PUT**

/api/v4/systems/config/{system\_id}/tariff

Update tariff for a system

### Arrays

**GET**

/api/v4/partner/systems/{system\_id}/arrays

Fetch particular system Array details

**PUT**

/api/v4/partner/systems/{system\_id}/arrays

Update all arrays for system

**GET**

/api/v4/partner/systems/{system\_id}/arrays/{array\_id}

Fetch Array details by id

**PUT**

/api/v4/partner/systems/{system\_id}/arrays/{array\_id}

Update particular system array details

**DELETE**

/api/v4/partner/systems/{system\_id}/arrays/{array\_id}

Delete an array by id

## 'Status' in API to 'Status' in Enlighten Mapping

| 'Status' in API | 'Status' in Enlighten |
| :---: | :---: |
| **deactivated** | **System Deactivated** |
| **normal** | **System Normal** |
| **comm** | **Envoy Not Reporting** |
| **micro** | **Microinverters Not Reporting** |
| **power** | **System Production Issue** |
| **meter** | **Meter Not Reporting** |
| **meter\_issue** | **Meter Issue** |
| **battery** | **AC Batteries Not Reporting** |
| **storage\_idle** | **Storage Inactive** |
| **encharge** | **Encharge Not Reporting** |
| **encharge\_issue** | **Encharge Issue** |
| **enpower** | **Enpower Not Reporting** |
| **enpower\_issue** | **Enpower Issue** |
| **retired** | **Retired** |
| **not\_monitored** | **Not Monitored** |
| **unused** | **Unused** |
| **disabled** | **Not Enabled** |
| **debug** | **Informational** |
| **info** | **Informational** |
| **monitored** | **Monitored** |
| **muted** | **Alerts Disabled** |
| **warning** | **Warning** |
| **Error** | **Error** |
| **no\_data** | **No Data** |
| **rma** | **RMA** |
| **unknown** | **Updating Data** |
| **nsr** | **Q Relay Not Reporting** |
| **any** | **Any Problem** |
| **data\_upload** | **Data upload in progress** |
| **on\_grid** | **On Grid** |
| **off\_grid** | **Off Grid** |
| **grid\_unknown** | Grid Status Unknown |

