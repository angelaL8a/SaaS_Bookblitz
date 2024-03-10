import { GraphQLError } from "graphql";
import {
  FORBIDDEN_ERROR_CODE,
  NOT_FOUND_CODE,
  UNAUTHENTICATED_CODE,
} from "../error-codes.js";
import { db } from "../../db/index.js";
import { removeImage } from "../../lib/cloudinary.js";

export const shiftResolvers = {
  Shift: {
    appointments: async (shift) => {
      const appointments = await db.appointment.findMany({
        where: { shiftId: shift.id },
        orderBy: { createdAt: "asc" },
      });

      return appointments;
    },

    employee: async (shift) => {
      const employee = await db.userInCompany.findUnique({
        where: { id: shift.employeeId },
      });

      return employee;
    },
  },

  Appointment: {
    client: async (appointment) => {
      if (!appointment.clientId) return null;

      const client = await db.userInCompany.findUnique({
        where: { id: appointment.clientId },
      });

      return client;
    },
  },

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
          company: { connect: { id: args.companyId } },
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
            clientId,
            id,
          } = appointment;

          await db.appointment.create({
            data: {
              id: id ?? undefined,
              referencialImageUrl,
              referencialImageId,
              startTime,
              endTime,
              date,
              title,
              description,
              fee,
              shift: { connect: { id: shift.id } },
              client: clientId ? { connect: { id: clientId } } : undefined,
            },
          });
        })
      );

      return shift;
    },

    Shift_UpdateShift: async (_, args, context) => {
      if (!context.isAdmin)
        throw new GraphQLError("You must be an admin!", {
          extensions: { code: FORBIDDEN_ERROR_CODE },
        });

      const { checkInTime, checkOutTime, appointments } = args.shiftDto;

      const shift = await db.shift.findUnique({
        where: { id: args.shiftId },
        include: { appointments: true },
      });
      if (!shift)
        throw new GraphQLError("Shift not found.", {
          extensions: { code: NOT_FOUND_CODE },
        });

      // Delete all the appointments and create again with the new appointments data
      await Promise.all(
        shift.appointments.map(async (apt) => {
          const newApt = appointments.find((a) => a.id === apt.id);
          if (!newApt) await removeImage(apt.referencialImageId);

          await db.appointment.delete({
            where: { id: apt.id },
          });
        })
      );

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
            clientId,
            id,
          } = appointment;

          const lastApt = shift.appointments.find((a) => a.id === id);
          if (lastApt) {
            if (lastApt.referencialImageId !== referencialImageId) {
              await removeImage(lastApt.referencialImageId);
            }

            if (lastApt.referencialImageId && !referencialImageId) {
              await removeImage(lastApt.referencialImageId);
            }
          }

          await db.appointment.create({
            data: {
              id: id ?? undefined,
              referencialImageUrl,
              referencialImageId,
              startTime,
              endTime,
              date: shift.date,
              title,
              description,
              fee,
              shift: { connect: { id: shift.id } },
              client: clientId ? { connect: { id: clientId } } : undefined,
            },
          });
        })
      );

      // Update the shift info
      const updatedShift = await db.shift.update({
        where: { id: args.shiftId },
        data: {
          checkInTime,
          checkOutTime,
        },
      });

      return updatedShift;
    },

    Shift_DeleteShift: async (_, args, context) => {
      if (!context.isAdmin)
        throw new GraphQLError("You must be an admin!", {
          extensions: { code: FORBIDDEN_ERROR_CODE },
        });

      const shift = await db.shift.findUnique({
        where: { id: args.shiftId },
        include: { appointments: true },
      });
      if (!shift)
        throw new GraphQLError("Shift not found.", {
          extensions: { code: NOT_FOUND_CODE },
        });

      const deletedShift = await db.shift.delete({
        where: { id: args.shiftId },
      });

      await Promise.all(
        shift.appointments.map(async (apt) => {
          if (apt.referencialImageId) {
            await removeImage(apt.referencialImageId);
          }
        })
      );

      return deletedShift;
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
