## **1. Project context**

Rural depopulation is a global challenge characterised by limited job opportunities and declining services in small
villages. This project proposes a digital platform to bridge the gap between people wishing to relocate to rural areas
and communities seeking new residents. Focusing on Catalonia as a pilot region, the platform centralises reliable data
on housing, employment, and financial grants to make rural relocation accessible and attractive.

## **2. User role**

The following roles will be involved in beta testing.

| **Role Name**     | **Description**                                                                                                                          |
|-------------------|------------------------------------------------------------------------------------------------------------------------------------------|
| Administrator     | An administrator has access to all the application, and can manage every housing and job listings.                                       |
| Local authorities | Local authorities or town representatives who manage the "supply" side by posting, editing, and deleting housing and job listings.       |
| Relocator         | Potential residents (remote workers, families) who use the platform to search, filter, and access information about rural opportunities. |

---

## **3. Feature table**

The following features will be shown during the defense.

| **Feature ID** | **User role**     | **Feature name**           | **Short description**                                                |
|----------------|-------------------|----------------------------|----------------------------------------------------------------------|
| F1             | Everyone          | Create an account          | Create a new account with an email and password                      |
| F2             | Everyone          | Login                      | Access the platform with an existing email and password.             |
| F3             | Local authorities | Creating a housing listing | Upload a new property with price, photos, and location.              |
| F4             | Local authorities | Post a job opportunity     | Upload a new property with price, photos, and location.              |
| F5             | Local authorities | Edit a listing             | Modify existing details of a house or job post.                      |
| F6             | Local authorities | Delete a listing           | Remove a post once the house is occupied or the job is filled        |
| F7             | Relocator         | Search via interactive map | Browse geographical markers representing opportunities in Catalonia. |
| F8             | Relocator         | Filter by lifestyle        | Narrow results by schools, internet speed, or climate.               |
| F9             | Relocator         | View grant details         | Access specific financial aid or tax benefit information for a town. |
| F10            | Relocator         | Read community stories     | Browse testimonials from people who have successfully relocated.     |
| F11            | Everyone          | Access settings            | Manage account profile and notification preferences.                 |
| F12            | Administrator     | Fetch APIs                 | Fetch housings and jobs data and display them                        |

---

## **4. Success Criteria**

| **Feature ID** | **Key success criteria**                                      | **Indicator/metric**                              | **Result**       |
|----------------|---------------------------------------------------------------|---------------------------------------------------|------------------|
| F1             | User create an account without errors                         | 15 attemps, 0 failures related to the application | Achieved (15/15) |
| F2             | User logs in without errors                                   | 15 attemps, 0 failures related to the application | Achieved (15/15) |
| F3             | New housings appear on the map instantly                      | 5 housings created, all visible ont he map        | Achieved         |
| F4             | Job listing displays all required fields                      | 5 jobs posted, no missing data                    | Achieved         |
| F5             | Edits update across the platform                              | 10 edits, all reflected in the relocator view     | Achieved         |
| F6             | Deleted listings are no longer visible                        | 5 deletions, 0 "ghost" listing visible            | Achieved         |
| F7             | Map markers load within 3 seconds                             | Average load time < 3s over 20 attemps            | Partially (3.2s) |
| F8             | Filtering only displays relevant results                      | 10 filter tests, 100% accuracy                    | Achieved         |
| F9             | Guides list and each guide are accessible                     | 5 views, 0 failure                                | Achieved         |
| F10            | Testimonials load correctly                                   | 5 views, 0 failure                                | Achieved         |
| F11            | Language choice and profile changes are saved                 | 10 changes, all persisted after logout            | Achieved         |
| F12            | Housings and jobs are correctly fetched from APIs and visible | 5 fetches, all data displayed                     | Achieved         |
