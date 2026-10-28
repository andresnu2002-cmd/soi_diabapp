import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';

import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

// ============================================
// ESTADOS DE ÁNIMO
// ============================================

const moods = [
  { emoji: '😊', label: 'Bien' },
  { emoji: '🙂', label: 'Tranquila' },
  { emoji: '😐', label: 'Normal' },
  { emoji: '😟', label: 'Preocupada' },
  { emoji: '😣', label: 'Abrumada' },
];

// ============================================
// MOMENTOS DE MEDICIÓN
// ============================================

const moments = [
  'Mañana',
  'Antes de comida',
  'Después de comida',
  'Noche',
];

// ============================================
// PANTALLA PRINCIPAL
// ============================================

export default function HomeScreen() {

  // Estado de ánimo
  const [selectedMood, setSelectedMood] = useState('Bien');

  // Momento de medición
  const [selectedMoment, setSelectedMoment] = useState('Mañana');

  // ============================================
  // NOTAS PARA EL PROFESIONAL
  // ============================================

  const [notes, setNotes] = useState([
    'He sentido más cansancio por las tardes.',
    'Quiero revisar mis mediciones de la mañana.',
  ]);

  const [newNote, setNewNote] = useState('');

  const [showNoteInput, setShowNoteInput] = useState(false);

  // Función para agregar una nota
  const addNote = () => {

    if (newNote.trim() !== '') {

      setNotes([...notes, newNote.trim()]);

      setNewNote('');

      setShowNoteInput(false);

    }

  };

  // ============================================
  // INTERFAZ
  // ============================================

  return (

    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >

      {/* ===================================== */}
      {/* ENCABEZADO */}
      {/* ===================================== */}

      <View style={styles.header}>

        <View>

          <Text style={styles.greeting}>
            BUENOS DÍAS
          </Text>

          <View style={styles.nameRow}>

            <Text style={styles.name}>
              andres
            </Text>

            <Text style={styles.leaf}>
              🌿
            </Text>

          </View>

        </View>

        <Pressable style={styles.avatar}>

          <Ionicons
            name="person"
            size={23}
            color={colors.brown}
          />

        </Pressable>

      </View>


      {/* ===================================== */}
      {/* SEMANA DE EMBARAZO */}
      {/* ===================================== */}

      <View style={styles.weekRow}>

        <View style={styles.weekCircle}>

          <Text style={styles.weekNumber}>
            24
          </Text>

        </View>

        <View style={styles.weekInfo}>

          <Text style={styles.weekText}>
            Semana 24 de 40
          </Text>

          <View style={styles.progressBackground}>

            <View style={styles.progressFill} />

          </View>

        </View>

      </View>


      {/* MENSAJE MOTIVACIONAL */}

      <Text style={styles.encouragement}>
        Hoy también cuenta cómo te sientes. 💛
      </Text>


      {/* ===================================== */}
      {/* ESTADO DE ÁNIMO */}
      {/* ===================================== */}

      <View style={styles.card}>

        <Text style={styles.sectionTitle}>
          ¿CÓMO ESTÁS HOY?
        </Text>

        <View style={styles.moodRow}>

          {moods.map((mood) => {

            const selected =
              selectedMood === mood.label;

            return (

              <Pressable
                key={mood.label}
                style={styles.moodItem}
                onPress={() =>
                  setSelectedMood(mood.label)
                }
              >

                <View
                  style={[
                    styles.emojiCircle,
                    selected && styles.selectedEmoji,
                  ]}
                >

                  <Text style={styles.emoji}>
                    {mood.emoji}
                  </Text>

                </View>

                <Text style={styles.moodLabel}>
                  {mood.label}
                </Text>

              </Pressable>

            );

          })}

        </View>

      </View>


      {/* ===================================== */}
      {/* TU SEGUIMIENTO */}
      {/* ===================================== */}

      <View style={styles.card}>

        <View style={styles.sectionHeader}>

          <Text style={styles.sectionTitle}>
            TU SEGUIMIENTO
          </Text>

          <Text style={styles.todayBadge}>
            Hoy
          </Text>

        </View>

        <View style={styles.momentGrid}>

          {moments.map((moment) => {

            const selected =
              selectedMoment === moment;

            return (

              <Pressable
                key={moment}
                style={[
                  styles.momentButton,
                  selected && styles.momentSelected,
                ]}
                onPress={() =>
                  setSelectedMoment(moment)
                }
              >

                <Ionicons
                  name={
                    selected
                      ? 'checkmark-circle'
                      : 'ellipse-outline'
                  }
                  size={18}
                  color={
                    selected
                      ? colors.green
                      : colors.sand
                  }
                />

                <Text style={styles.momentText}>
                  {moment}
                </Text>

              </Pressable>

            );

          })}

        </View>

        <Pressable style={styles.primaryButton}>

          <Text style={styles.primaryButtonText}>
            + Registrar medición
          </Text>

        </Pressable>

      </View>


      {/* ===================================== */}
      {/* TU PRÓXIMA CITA */}
      {/* ===================================== */}

      <View style={styles.appointmentCard}>

        <Text style={styles.sectionTitle}>
          TU PRÓXIMA CITA
        </Text>

        <View style={styles.appointmentRow}>

          <View style={styles.dateBadge}>

            <Text style={styles.dateMonth}>
              SEP
            </Text>

            <Text style={styles.dateDay}>
              18
            </Text>

          </View>

          <View style={styles.appointmentInfo}>

            <Text style={styles.appointmentTitle}>
              Control prenatal
            </Text>

            <Text style={styles.appointmentSubtitle}>
              👩‍⚕️ Próxima consulta
            </Text>

          </View>

        </View>

        <Pressable style={styles.appointmentButton}>

          <Text style={styles.appointmentButtonText}>
            Prepararme para mi cita
          </Text>

        </Pressable>

      </View>


      {/* ===================================== */}
      {/* LO QUE QUIERES CONTAR */}
      {/* NUEVA SECCIÓN */}
      {/* ===================================== */}

      <View style={styles.notesCard}>

        <Text style={styles.sectionTitle}>
          LO QUE QUIERES CONTAR
        </Text>

        <Text style={styles.notesSubtitle}>
          "Hoy quiero preguntarle a mi profesional..."
        </Text>


        {/* LISTA DE NOTAS */}

        <View style={styles.notesList}>

          {notes.map((note, index) => (

            <View
              key={index}
              style={styles.noteItem}
            >

              <Text style={styles.noteIcon}>
                ✏️
              </Text>

              <Text style={styles.noteText}>
                {note}
              </Text>

            </View>

          ))}

        </View>


        {/* CAMPO PARA NUEVA NOTA */}

        {showNoteInput && (

          <TextInput
            style={styles.noteInput}
            placeholder="Escribe lo que quieres contar..."
            placeholderTextColor={colors.muted}
            value={newNote}
            onChangeText={setNewNote}
            multiline
          />

        )}


        {/* BOTÓN AGREGAR NOTA */}

        <Pressable
          style={styles.addNoteButton}
          onPress={() => {

            if (!showNoteInput) {

              setShowNoteInput(true);

            } else {

              addNote();

            }

          }}
        >

          <Text style={styles.addNoteButtonText}>

            {showNoteInput
              ? 'Guardar nota'
              : '+ Agregar nota'}

          </Text>

        </Pressable>

      </View>


      {/* ===================================== */}
      {/* ESPACIO INFERIOR */}
      {/* ===================================== */}

      <View style={styles.bottomSpace} />

    </ScrollView>

  );

}


// ============================================
// PALETA DE COLORES S.O.I
// ============================================

const colors = {

  background: '#F3E8D5',

  white: '#FFFFFF',

  brown: '#6E503D',

  text: '#795B48',

  muted: '#B8A18C',

  sand: '#CDB99D',

  green: '#607E61',

  paleGreen: '#E7EEE4',

  coral: '#C47769',

  border: '#E4D0B7',

  paleYellow: '#FBF4D9',

  yellowBorder: '#EED477',

};


// ============================================
// ESTILOS
// ============================================

const styles = StyleSheet.create({

  // =====================================
  // PANTALLA
  // =====================================

  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },

  content: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 24,
    gap: 16,
  },


  // =====================================
  // ENCABEZADO
  // =====================================

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  greeting: {
    color: colors.green,
    fontSize: 11,
    letterSpacing: 1.4,
    fontWeight: '500',
  },

  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 2,
  },

  name: {
    color: colors.brown,
    fontSize: 28,
    fontStyle: 'italic',
    fontFamily: 'serif',
  },

  leaf: {
    fontSize: 25,
  },

  avatar: {
    width: 43,
    height: 43,
    borderRadius: 22,
    borderWidth: 2,
    borderColor: colors.sand,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },


  // =====================================
  // SEMANA DE EMBARAZO
  // =====================================

  weekRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    marginTop: 2,
  },

  weekCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 2,
    borderColor: colors.green,
    backgroundColor: colors.paleGreen,
    justifyContent: 'center',
    alignItems: 'center',
  },

  weekNumber: {
    fontSize: 13,
    color: colors.green,
  },

  weekInfo: {
    flex: 1,
    gap: 5,
  },

  weekText: {
    fontSize: 11,
    color: colors.text,
  },

  progressBackground: {
    width: '48%',
    height: 5,
    borderRadius: 4,
    backgroundColor: '#DDCDB6',
    overflow: 'hidden',
  },

  progressFill: {
    width: '60%',
    height: '100%',
    borderRadius: 4,
    backgroundColor: colors.green,
  },

  encouragement: {
    color: colors.text,
    fontSize: 13,
    fontStyle: 'italic',
    fontFamily: 'serif',
    marginBottom: 2,
  },


  // =====================================
  // TARJETAS GENERALES
  // =====================================

  card: {
    backgroundColor: colors.white,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 20,
    gap: 18,
    elevation: 2,
    shadowColor: '#6E503D',
    shadowOpacity: 0.07,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },

  sectionTitle: {
    fontSize: 11,
    fontWeight: '500',
    letterSpacing: 1.1,
    color: colors.muted,
  },


  // =====================================
  // ESTADO DE ÁNIMO
  // =====================================

  moodRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 3,
  },

  moodItem: {
    alignItems: 'center',
    flex: 1,
    gap: 8,
  },

  emojiCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
  },

  selectedEmoji: {
    backgroundColor: colors.paleGreen,
  },

  emoji: {
    fontSize: 23,
  },

  moodLabel: {
    color: colors.text,
    fontSize: 9,
    textAlign: 'center',
  },


  // =====================================
  // SEGUIMIENTO
  // =====================================

  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  todayBadge: {
    backgroundColor: colors.paleGreen,
    color: colors.green,
    fontSize: 11,
    fontWeight: '600',
    overflow: 'hidden',
    borderRadius: 12,
    paddingHorizontal: 11,
    paddingVertical: 5,
  },

  momentGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },

  momentButton: {
    width: '48%',
    minHeight: 44,
    flexGrow: 1,
    flexBasis: '40%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    paddingHorizontal: 11,
    paddingVertical: 9,
  },

  momentSelected: {
    backgroundColor: colors.paleGreen,
    borderColor: colors.green,
  },

  momentText: {
    flex: 1,
    fontSize: 11,
    color: colors.text,
  },

  primaryButton: {
    minHeight: 44,
    borderRadius: 12,
    backgroundColor: colors.coral,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
  },

  primaryButtonText: {
    color: colors.white,
    fontSize: 13,
    fontWeight: '600',
  },


  // =====================================
  // PRÓXIMA CITA
  // =====================================

  appointmentCard: {
    backgroundColor: colors.paleYellow,
    borderColor: colors.yellowBorder,
    borderWidth: 1,
    borderRadius: 23,
    padding: 20,
    gap: 14,
  },

  appointmentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 13,
  },

  dateBadge: {
    width: 48,
    height: 48,
    backgroundColor: '#F0D98B',
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },

  dateMonth: {
    fontSize: 9,
    fontWeight: '600',
    color: colors.brown,
  },

  dateDay: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.brown,
  },

  appointmentInfo: {
    flex: 1,
    gap: 4,
  },

  appointmentTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.brown,
  },

  appointmentSubtitle: {
    fontSize: 11,
    color: colors.text,
  },

  appointmentButton: {
    minHeight: 43,
    borderRadius: 12,
    backgroundColor: colors.brown,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
  },

  appointmentButtonText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: '600',
  },


  // =====================================
  // LO QUE QUIERES CONTAR
  // =====================================

  notesCard: {
    backgroundColor: colors.white,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 20,
    gap: 14,

    elevation: 2,
    shadowColor: '#6E503D',
    shadowOpacity: 0.07,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },

  notesSubtitle: {
    fontSize: 12,
    color: colors.coral,
    fontStyle: 'italic',
    fontFamily: 'serif',
  },

  notesList: {
    gap: 8,
  },

  noteItem: {
    backgroundColor: colors.background,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },

  noteIcon: {
    fontSize: 14,
  },

  noteText: {
    flex: 1,
    fontSize: 11,
    color: colors.text,
    lineHeight: 17,
  },


  // =====================================
  // AGREGAR NOTA
  // =====================================

  addNoteButton: {
    minHeight: 43,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: colors.sand,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },

  addNoteButtonText: {
    color: colors.coral,
    fontSize: 12,
    fontWeight: '600',
  },

  noteInput: {
    backgroundColor: colors.background,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 12,
    minHeight: 75,
    fontSize: 12,
    color: colors.text,
    textAlignVertical: 'top',
  },


  // =====================================
  // ESPACIO INFERIOR
  // =====================================

  bottomSpace: {
    height: 8,
  },

});