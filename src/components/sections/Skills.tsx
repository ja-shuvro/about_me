import { Container, Title, Text, Box, Badge, Group, useMantineTheme } from '@mantine/core';
import { motion } from 'framer-motion';

const skills = [
    "Flutter", "React.js", "Next.js", "Tailwind CSS", "HTML5", "CSS3",
    "Laravel", "Express.js", "NestJS", "REST API Development",
    "MongoDB", "MySQL", "Prisma", "Sequelize", "Mongoose",
    "WordPress Development", "Git", "GitHub"
];

export function Skills() {
    const theme = useMantineTheme();
    return (
        <Box id="skills" py={100} style={{ overflow: 'hidden' }}>
            <Container size="md">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <Title order={2} mb="xl" size="h1">Skills</Title>
                    <Text c="dimmed" mb={40} maw={500}>
                        A collection of technologies and tools I work with to build digital products.
                    </Text>
                </motion.div>

                <Group gap="md">
                    {skills.map((skill, index) => (
                        <motion.div
                            key={skill}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: index * 0.05 }}
                            whileHover={{ scale: 1.1 }}
                        >
                            <Badge
                                size="xl"
                                variant="gradient"
                                gradient={{
                                    from: `${theme.primaryColor}.4`,
                                    to: `${theme.primaryColor}.7`,
                                    deg: 90
                                }}
                                style={{
                                    textTransform: 'none',
                                    fontSize: '1rem',
                                    padding: '1rem 1.5rem',
                                    cursor: 'default'
                                }}
                            >
                                {skill}
                            </Badge>
                        </motion.div>
                    ))}
                </Group>
            </Container>
        </Box>
    );
}
