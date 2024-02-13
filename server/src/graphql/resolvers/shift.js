import { GraphQLError } from "graphql";
import {
  FORBIDDEN_ERROR_CODE,
  NOT_FOUND_CODE,
  UNAUTHENTICATED_CODE,
} from "../error-codes.js";
import { db } from "../../db/index.js";

export const shiftResolvers = {
  Mutation: {
    Shift_CreateShift: async (_, args, context) => {
      if (!context.isAdmin)
        throw new GraphQLError("You must be an admin!", {
          extensions: { code: FORBIDDEN_ERROR_CODE },
        });

      const { checkInTime, checkOutTime, date, employeeId, appointments } =
        args.shiftDto;

      const shift = await db.shift.create({
        data: {
          checkInTime,
          checkOutTime,
          date,
          employee: { connect: { id: employeeId } },
        },
      });

      await Promise.all(
        appointments.map(async (appointment) => {
          const {
            referencialImageUrl,
            referencialImageId,
            startTime,
            endTime,
            title,
            description,
            fee,
            status,
            clientId,
          } = appointment;

          await db.appointment.create({
            data: {
              referencialImageUrl,
              referencialImageId,
              startTime,
              endTime,
              date,
              title,
              description,
              fee,
              status,
              shift: { connect: { id: shift.id } },
              client: { connect: { id: clientId } },
            },
          });
        })
      );

      return shift;
    },

    Appointment_CreateComment: async (_, args, context) => {
      if (!context.user) {
        throw new GraphQLError("User not logged in!", {
          extensions: { code: UNAUTHENTICATED_CODE },
        });
      }

      const { commentDto } = args;

      const appointment = await db.appointment.findUnique({
        where: { id: commentDto.appointmentId },
      });
      if (!appointment)
        throw new GraphQLError("Appointment not found!", {
          extensions: { code: NOT_FOUND_CODE },
        });

      const userCompany = await db.userInCompany.findFirstOrThrow({
        where: { userId: context.user.id },
      });
      if (!userCompany) {
        throw new GraphQLError("User not found!", {
          extensions: { code: NOT_FOUND_CODE },
        });
      }

      const comment = await db.commentOnAppointment.create({
        data: {
          content: commentDto.content,
          appointment: { connect: { id: appointment.id } },
          creator: { connect: { id: userCompany.id } },
        },
      });

      return comment;
    },
  },
};
