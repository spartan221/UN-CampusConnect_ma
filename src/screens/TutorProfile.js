import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, FlatList, ScrollView, SafeAreaView } from 'react-native';
import { getTutorProfile } from '../utilities/tutorprofile';

const ProfileHeader = ({ name, last_name, photo, description }) => {
  return (
    <View style={styles.profileHeader}>
      <Image source={{ uri: photo }} style={styles.photo} />
      <Text style={styles.name}>
        {name} {last_name}
      </Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
};

const Skills = ({ skills }) => {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Habilidades</Text>
      <FlatList
        data={skills}
        renderItem={({ item }) => <Text style={styles.item}>{item.name}</Text>}
        keyExtractor={(item, index) => index.toString()}
        scrollEnabled={false}
      />
    </View>
  );
};

const Languages = ({ languages, tutor_languages }) => {
  const combinedLanguages = languages.map((language) => {
    const levelObj = tutor_languages.find((level) => level.language_id === language.id);
    const level = levelObj ? levelObj.level : 'Nivel sin especificar';
    return { id: language.id, name: language.name, level };
  });
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Lenguajes</Text>
      <FlatList
        data={combinedLanguages}
        renderItem={({ item }) => (
          <Text style={styles.item}>
            {item.name} - {item.level}
          </Text>
        )}
        keyExtractor={(item, index) => index.toString()}
        scrollEnabled={false}
      />
    </View>
  );
};

const Schools = ({ schools, tutor_schools }) => {
  const combinedSchools = schools.map((school) => {
    const tutorSchoolsObj = tutor_schools.find(
      (tutorSchool) => tutorSchool.school_id === school.id
    );
    const start_year = tutorSchoolsObj ? tutorSchoolsObj.start_year : 'Año sin especificar';
    const end_year = tutorSchoolsObj ? tutorSchoolsObj.end_year : 'Año sin especificar';
    const title = tutorSchoolsObj ? tutorSchoolsObj.title : 'Título sin especificar';
    return { id: school.id, name: school.name, start_year, end_year, title };
  });
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Educación</Text>
      <FlatList
        data={combinedSchools}
        renderItem={({ item }) => (
          <Text style={styles.item}>
            {item.title} - {item.name} ({item.start_year} - {item.end_year})
          </Text>
        )}
        scrollEnabled={false}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const Jobs = ({ jobs, tutor_jobs }) => {
  const combinedJobs = jobs.map((job) => {
    const tutorJobsObj = tutor_jobs.find((tutorJob) => tutorJob.job_id === job.id);
    const start_year = tutorJobsObj ? tutorJobsObj.start_year : 'Año sin especificar';
    const end_year = tutorJobsObj ? tutorJobsObj.end_year : 'Año sin especificar';
    const position = tutorJobsObj ? tutorJobsObj.position : 'Posición sin especificar';
    return { name: job.name, start_year, end_year, position };
  });
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Experiencia Laboral</Text>
      <FlatList
        data={combinedJobs}
        renderItem={({ item }) => (
          <Text style={styles.item}>
            {item.position} - {item.name} ({item.start_year} - {item.end_year})
          </Text>
        )}
        scrollEnabled={false}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const Profile = ({ data }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [myData, setMyData] = useState({});

  useEffect(() => {
    fetchData().then(() => {
      setIsLoading(false);
    });
  }, []);

  const fetchData = async () => {
    await getTutorProfile('646b7577a3c962f518f9fe35')
      .then((response) => {
        setMyData(response);
        console.log(myData);
      })
      .catch((errors) => {
        console.log(errors);
      });
  };

  if (isLoading) {
    return (
      <View>
        <Text>Cargando datos...</Text>
      </View>
    );
  }

  const {
    name,
    last_name,
    birth_place,
    birthdate,
    address,
    email,
    phone,
    description,
    photo,
    skills,
    languages,
    tutor_languages,
    schools,
    tutor_schools,
    jobs,
    tutor_jobs,
  } = myData;

  return (
    <ScrollView>
      <View style={styles.container}>
        <ProfileHeader name={name} last_name={last_name} photo={photo} description={description} />
        <View style={styles.details}>
          <Text style={styles.item}>
            <Text style={styles.label}>Lugar de Nacimiento:</Text> {birth_place}
          </Text>
          <Text style={styles.item}>
            <Text style={styles.label}>Fecha de Nacimiento:</Text> {birthdate}
          </Text>
          <Text style={styles.item}>
            <Text style={styles.label}>Dirección:</Text> {address}
          </Text>
          <Text style={styles.item}>
            <Text style={styles.label}>Correo electrónico:</Text> {email}
          </Text>
          <Text style={styles.item}>
            <Text style={styles.label}>Teléfono:</Text> {phone}
          </Text>
          <Skills skills={skills} />
          <Languages languages={languages} tutor_languages={tutor_languages} />
          <Schools schools={schools} tutor_schools={tutor_schools} />
          <Jobs jobs={jobs} tutor_jobs={tutor_jobs} />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  profileHeader: {
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  photo: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
  description: {
    fontSize: 16,
    marginTop: 10,
  },
  details: {
    padding: 20,
  },
  label: {
    fontWeight: 'bold',
  },
  section: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  item: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default Profile;
