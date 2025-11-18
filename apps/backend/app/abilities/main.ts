/*
|--------------------------------------------------------------------------
| Bouncer abilities
|--------------------------------------------------------------------------
|
| You may export multiple abilities from this file and pre-register them
| when creating the Bouncer instance.
|
| Pre-registered policies and abilities can be referenced as a string by their
| name.
|
*/

import { Bouncer } from "@adonisjs/bouncer";

/**
 * Delete the following ability to start from
 * scratch
 */
export const editUser = Bouncer.ability(() => true);
