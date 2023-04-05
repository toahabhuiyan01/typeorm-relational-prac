import { AppDataSource } from "../data-source"
import { ContactInfo } from "../entity/contact-info.entity"
import { Employee } from "../entity/employee.entity"
import { Meeting } from "../entity/meeting.entity"
import { Task } from "../entity/task.entity"

const seed = async () => {
    if(!AppDataSource.isInitialized) {
        await AppDataSource.initialize()
    }

    const employeeRepo = AppDataSource.getRepository(Employee)
    const contactRepo = AppDataSource.getRepository(ContactInfo)
    const taskRepo = AppDataSource.getRepository(Task)
    const meetingtRepo = AppDataSource.getRepository(Meeting)

    const ceo = employeeRepo.create({ name: 'Mr CEO' })
    await employeeRepo.save(ceo)

    const ceoContactInfo = contactRepo.create({
        email: 'ceo@hotmail.com',
        phone: '1234567890',
        employee: ceo
    })

    await contactRepo.save(ceoContactInfo)

    const meeting = meetingtRepo.create({ zoomUrl: 'meet.meeting.com' })
    meeting.attendees = [ceo]

    await meetingtRepo.save(meeting)


    
    const task1 = taskRepo.create({
        name: 'Hire People',
        description: 'Hire peoples for different degisnation, with good skills'
    })
    
    const task2 = taskRepo.create({
        name: 'Present findings to CEO'
    })
    
    const tasks = await taskRepo.save([task1, task2])
    console.log(tasks)
    
    const manager = employeeRepo.create({
        name: 'random',
        manager: ceo,
        meetings: [meeting],
        tasks
    })

    await employeeRepo.save(manager)
}

export default seed