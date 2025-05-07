import {db} from "@/db/index";
import {migrate} from "drizzle-orm/neon-http/migrator";

const main = async () => {
    try {
        await migrate(db, {
            migrationsFolder: 'src/db/migrations',
        })
        console.log("Migrated successfully")
    } catch (error) {
        console.error('Error during migration', error);
        process.exit(1);
    }
}

main();