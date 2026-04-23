# **Beta Test Plan - Poblaria**

## **1. Project context**

Rural depopulation is a global challenge characterised by limited job opportunities and declining services in small
villages. This project proposes a digital platform to bridge the gap between people wishing to relocate to rural areas
and communities seeking new residents. Focusing on Catalonia as a pilot region, the platform centralises reliable data
on housing, employment, and financial grants to make rural relocation accessible and attractive.

## **2. User role**

The following roles will be involved in beta testing.

| **Role Name**         | **Description**                                                                                                                          |
|:----------------------|:-----------------------------------------------------------------------------------------------------------------------------------------|
| **Administrator**     | An administrator has access to all the application, and can manage every housing and job listings.                                       |
| **Local authorities** | Local authorities or town representatives who manage the "supply" side by posting, editing, and deleting housing and job listings.       |
| **Relocator**         | Potential residents (remote workers, families) who use the platform to search, filter, and access information about rural opportunities. |

---

## **3. Feature table**

The following features will be tested to ensure the platform is robust, user-friendly, and fully functional.

| **Feature ID** | **User role**     | **Feature name**           | **Short description**                                                           |
|:---------------|:------------------|:---------------------------|:--------------------------------------------------------------------------------|
| **F1**         | Everyone          | Create an account          | Create a new account with an email and password.                                |
| **F2**         | Everyone          | Login                      | Access the platform with an existing email and password.                        |
| **F3**         | Local authorities | Creating a housing listing | Upload a new property with price, photos, and location.                         |
| **F4**         | Local authorities | Post a job opportunity     | Create a professional job offer including salary range, job type, and location. |
| **F5**         | Local authorities | Edit a listing             | Modify existing details of a house or job post.                                 |
| **F6**         | Local authorities | Delete a listing           | Remove a post once the house is occupied or the job is filled.                  |
| **F7**         | Relocator         | Search via interactive map | Browse geographical markers representing opportunities in Catalonia.            |
| **F8**         | Relocator         | Filter by lifestyle        | Narrow results by schools, internet speed, or climate.                          |
| **F9**         | Relocator         | View grant details         | Access specific financial aid or tax benefit information for a town.            |
| **F10**        | Relocator         | Read community stories     | Browse testimonials from people who have successfully relocated.                |
| **F11**        | Everyone          | Access settings            | Manage account profile and notification preferences.                            |
| **F12**        | Administrator     | Fetch APIs                 | Fetch housings and jobs data from external sources and display them.            |
| **F13**        | Relocator         | Favorite listings          | Save a house or job to a personal wishlist for later viewing.                   |
| **F14**        | Relocator         | Contact local authority    | Direct contact form to send inquiries to the town representative.               |

---

## **4. Success Criteria & Edge Cases**

To guarantee a production-ready application, our success criteria now include strict validations and edge case management.

| **Feature ID** | **Key success criteria & Edge Cases**            | **Indicator/metric**                                                                                                                             | **Expected Result** |
|:---------------|:-------------------------------------------------|:-------------------------------------------------------------------------------------------------------------------------------------------------|:--------------------|
| **F1**         | Account creation handles duplicates gracefully.  | 15 creation attempts. Testing with an already registered email must trigger a clear "Email already in use" UI error without crashing.            | Achieved            |
| **F2**         | Secure login with proper error handling.         | 15 login attempts. 100% of wrong credentials must return a clean 401 error message to the user.                                                  | Achieved            |
| **F3**         | Robust housing creation & image upload.          | 5 housings created. Uploading an oversized image (>10MB) must be rejected with a user-friendly warning or automatically compressed.              | Achieved            |
| **F4**         | Strict validation for job postings.              | 5 jobs posted. Form submission must be strictly blocked if mandatory fields (e.g., Salary, Location) are empty.                                  | Achieved            |
| **F5**         | Edits update synchronously across the platform.  | 10 edits made. 100% of changes must be immediately reflected in the Relocator's view.                                                            | Achieved            |
| **F6**         | Deleted listings are completely purged.          | 5 deletions. 0 "ghost" listings remain visible in the database or on the map.                                                                    | Achieved            |
| **F7**         | Map performs well under heavy load.              | Average load time < 3s when rendering 100+ concurrent markers. *(Note: Clustering implemented to improve rendering times).*                      | Achieved            |
| **F8**         | Multi-criteria filtering is completely accurate. | 10 complex filter tests (e.g., Climate + Internet speed). 100% accuracy in displayed results.                                                    | Achieved            |
| **F9**         | Grants guides are accessible and readable.       | 5 views of different grant pages, 0 fetch failures.                                                                                              | Achieved            |
| **F10**        | Testimonials load correctly.                     | 5 views, 0 rendering failures.                                                                                                                   | Achieved            |
| **F11**        | Settings updates are persistent.                 | 10 profile changes made. 100% of changes remain active after logging out and logging back in.                                                    | Achieved            |
| **F12**        | Resilient external API fetching.                 | 5 fetches. If the external API is down or times out, the app must display a "Service temporarily unavailable" message instead of a blank screen. | Achieved            |
| **F13**        | Favoriting is immediate and persistent.          | 10 listings favorited/unfavorited. UI updates instantly, and states persist upon page reload.                                                    | Unachieved          |
| **F14**        | Contact forms are delivered securely.            | 5 messages sent. 100% delivery rate or proper error feedback if the server fails.                                                                | Achieved            |