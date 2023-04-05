import { AppDataSource } from "./data-source"
import { Employee } from "./entity/employee.entity"
import { Meeting } from "./entity/meeting.entity"
import { Task } from "./entity/task.entity"
import seed from "./functions/seed"

(async () => {
    await seed()
    if(!AppDataSource.isInitialized) {
        await AppDataSource.initialize()
    }

    const employeeRepo = AppDataSource.getRepository(Employee)
    const employees = await employeeRepo.find({
        relations: ['manager', 'directReports', 'contactInfo', 'meetings']
    })

    console.log(employees)

    const meetRepo = AppDataSource.getRepository(Meeting)
    console.log(await meetRepo.find({ relations: ['attendees']}))

    const taskRepo = AppDataSource.getRepository(Task)
    console.log(await taskRepo.find({ relations: ['employee']}))
})()