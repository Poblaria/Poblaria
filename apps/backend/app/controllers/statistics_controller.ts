import { DateTime } from "luxon";
import type { HttpContext } from "@adonisjs/core/http";
import Housing from "#models/housing";
import Job from "#models/job";
import User from "#models/user";
import StatisticPolicy from "#policies/statistic_policy";
import { getStatisticsValidator } from "#validators/statistics";
import NewsletterSubscriber from "#models/newsletter_subscriber";

export default class StatisticsController {
    async show({ bouncer, request, response }: HttpContext) {
        if (await bouncer.with(StatisticPolicy).denies("view")) return response.forbidden();

        const { from, to } = await request.validateUsing(getStatisticsValidator);

        //region Dates
        const now = DateTime.now();

        const currentMonthStart = from
            ? DateTime.fromJSDate(from).startOf("day")
            : now.startOf("month");
        const currentMonthEnd = to ? DateTime.fromJSDate(to).endOf("day") : now.endOf("month");

        const periodDurationInDays = Math.ceil(
            currentMonthEnd.diff(currentMonthStart, "days").days
        );
        const previousMonthEnd = currentMonthStart.minus({ days: 1 }).endOf("day");
        const previousMonthStart = previousMonthEnd
            .minus({ days: periodDurationInDays - 1 })
            .startOf("day");
        //endregion

        //region Housings
        const newHousingsCurrentMonth = await Housing.query()
            .whereBetween("created_at", [currentMonthStart.toSQL()!, currentMonthEnd.toSQL()!])
            .count("* as total");

        const newHousingsPreviousMonth = await Housing.query()
            .whereBetween("created_at", [previousMonthStart.toSQL()!, previousMonthEnd.toSQL()!])
            .count("* as total");

        const totalHousings = await Housing.query().count("* as total");
        //endregion

        //region Jobs
        const newJobsCurrentMonth = await Job.query()
            .whereBetween("created_at", [currentMonthStart.toSQL()!, currentMonthEnd.toSQL()!])
            .count("* as total");

        const newJobsPreviousMonth = await Job.query()
            .whereBetween("created_at", [previousMonthStart.toSQL()!, previousMonthEnd.toSQL()!])
            .count("* as total");

        const totalJobs = await Job.query().count("* as total");
        //endregion

        //region Users
        //region Default
        const newDefaultUsersCurrentMonth = await User.query()
            .where("role", "default")
            .whereBetween("created_at", [currentMonthStart.toSQL()!, currentMonthEnd.toSQL()!])
            .count("* as total");

        const newDefaultUsersPreviousMonth = await User.query()
            .where("role", "default")
            .whereBetween("created_at", [previousMonthStart.toSQL()!, previousMonthEnd.toSQL()!])
            .count("* as total");

        const totalDefaultUsers = await User.query().where("role", "default").count("* as total");
        //endregion

        //region Local Authorities
        const newLocalAuthorityUsersCurrentMonth = await User.query()
            .where("role", "local_authority")
            .whereBetween("created_at", [currentMonthStart.toSQL()!, currentMonthEnd.toSQL()!])
            .count("* as total");

        const newLocalAuthorityUsersPreviousMonth = await User.query()
            .where("role", "local_authority")
            .whereBetween("created_at", [previousMonthStart.toSQL()!, previousMonthEnd.toSQL()!])
            .count("* as total");

        const totalLocalAuthorityUsers = await User.query()
            .where("role", "local_authority")
            .count("* as total");
        //endregion

        //region Administrators
        const newAdministratorUsersCurrentMonth = await User.query()
            .where("role", "administrator")
            .whereBetween("created_at", [currentMonthStart.toSQL()!, currentMonthEnd.toSQL()!])
            .count("* as total");

        const newAdministratorUsersPreviousMonth = await User.query()
            .where("role", "administrator")
            .whereBetween("created_at", [previousMonthStart.toSQL()!, previousMonthEnd.toSQL()!])
            .count("* as total");

        const totalAdministratorUsers = await User.query()
            .where("role", "administrator")
            .count("* as total");
        //endregion
        //endregion

        //region Newsletter
        const newSubscribersCurrentMonth = await NewsletterSubscriber.query()
            .whereBetween("subscribed_at", [currentMonthStart.toSQL()!, currentMonthEnd.toSQL()!])
            .count("* as total");

        const newSubscribersPreviousMonth = await NewsletterSubscriber.query()
            .whereBetween("subscribed_at", [previousMonthStart.toSQL()!, previousMonthEnd.toSQL()!])
            .count("* as total");

        const totalSubscribers = await NewsletterSubscriber.query().count("* as total");
        //endregion

        return {
            meta: {
                periods: {
                    current: {
                        from: currentMonthStart.toISODate(),
                        to: currentMonthEnd.toISODate()
                    },
                    previous: {
                        from: previousMonthStart.toISODate(),
                        to: previousMonthEnd.toISODate()
                    }
                }
            },
            housings: {
                new: {
                    current: Number(newHousingsCurrentMonth[0].$extras.total),
                    previous: Number(newHousingsPreviousMonth[0].$extras.total)
                },
                total: Number(totalHousings[0].$extras.total)
            },
            jobs: {
                new: {
                    current: Number(newJobsCurrentMonth[0].$extras.total),
                    previous: Number(newJobsPreviousMonth[0].$extras.total)
                },
                total: Number(totalJobs[0].$extras.total)
            },
            users: {
                default: {
                    new: {
                        current: Number(newDefaultUsersCurrentMonth[0].$extras.total),
                        previous: Number(newDefaultUsersPreviousMonth[0].$extras.total)
                    },
                    total: Number(totalDefaultUsers[0].$extras.total)
                },
                localAuthorities: {
                    new: {
                        current: Number(newLocalAuthorityUsersCurrentMonth[0].$extras.total),
                        previous: Number(newLocalAuthorityUsersPreviousMonth[0].$extras.total)
                    },
                    total: Number(totalLocalAuthorityUsers[0].$extras.total)
                },
                administrators: {
                    new: {
                        current: Number(newAdministratorUsersCurrentMonth[0].$extras.total),
                        previous: Number(newAdministratorUsersPreviousMonth[0].$extras.total)
                    },
                    total: Number(totalAdministratorUsers[0].$extras.total)
                }
            },
            newsletter: {
                subscribers: {
                    new: {
                        current: Number(newSubscribersCurrentMonth[0].$extras.total),
                        previous: Number(newSubscribersPreviousMonth[0].$extras.total)
                    },
                    total: Number(totalSubscribers[0].$extras.total)
                }
            }
        };
    }
}
