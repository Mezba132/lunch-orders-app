import { Injectable } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class EmployeesService {
  constructor(private prisma: PrismaService) {}

  create = async (body: CreateEmployeeDto) => {
    try {
      const newEmployee = await this.prisma.employee.create({ data: body });
      if (newEmployee) {
        return {
          success: true,
          message: 'Successfully create a new employee',
          data: newEmployee,
        };
      }
    } catch (error) {
      if (error.code === 'P2002') {
        return {
          success: false,
          message: 'Employee already exist',
        };
      }
      return {
        success: false,
        message: error,
      };
    }
  };

  findAll = async () => {
    try {
      let allEmployee = await this.prisma.employee.findMany({
        orderBy: {
          id: 'asc',
        },
      });
      return {
        success: true,
        message: 'All data fetch successfully.',
        data: allEmployee,
      };
    } catch (error) {
      return {
        success: false,
        message: error,
      };
    }
  };

  findOne = async (id: number) => {
    try {
      let getEmployeeById = await this.prisma.employee.findUnique({
        where: { id },
      });
      return {
        success: true,
        message: `${getEmployeeById.name} fetch successfully.`,
        data: getEmployeeById,
      };
    } catch (error) {
      return {
        success: false,
        message: error,
      };
    }
  };

  update = async (id: number, body: UpdateEmployeeDto) => {
    try {
      let updateEmployee = await this.prisma.employee.update({
        where: { id },
        data: body,
      });
      if (!updateEmployee) {
        return {
          success: false,
          message: 'Update Failed.',
        };
      }
      return {
        success: true,
        message: 'Update data successfully.',
        data: updateEmployee,
      };
    } catch (error) {
      return {
        success: false,
        message: error,
      };
    }
  };
}
